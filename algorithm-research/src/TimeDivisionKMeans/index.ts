import _ from "lodash";
import KMeans from "../KMeans";
import { scaling } from "../MinMaxScaler/scailing";
import { TimeDivisionMemoryModel } from "./models";
import { TimeMeterData, TimeDivisionMemory } from "./models/types";

class TimeDivisionKMeans implements Iterator<TimeDivisionMemory> {
  size: number;
  cursor: number;
  datas: Array<any>;

  memory: TimeDivisionMemory[];
  isEnd: boolean;

  constructor(size: number) {
    this.size = size;
    this.cursor = 0;
    this.datas = [];
    this.memory = [];
    this.isEnd = false;
  }

  static async get() {
    const memoryDocs = await TimeDivisionMemoryModel.find({}).sort({
      createdAt: 1,
    });
    const memory = _.map(memoryDocs, (doc) =>
      TimeDivisionMemory.getFromDoc(doc)
    );

    const size = memory[0].centroids[0].length;
    const tdKMeans = new TimeDivisionKMeans(size);
    while (memory.length * size > tdKMeans.datas.length)
      await tdKMeans.appendData();

    tdKMeans.memory = memory;

    return tdKMeans;
  }

  async appendData() {
    const meterDatas = await TimeMeterData.get(
      this.size * this.cursor,
      this.size
    );
    if (meterDatas.length === 0) {
      this.isEnd = true;
      return;
    }

    this.datas = _.concat(this.datas, meterDatas);
    this.cursor++;
  }

  round() {
    const takeDatas = _.takeRight(this.datas, this.size);
    const datas = _.flatten(_.map(takeDatas, ({ data }) => data));

    const grouped = _.groupBy(datas, "name");
    const merge = _.mapValues(grouped, (g) => _.map(g, ({ kwh }) => kwh));

    const meansDatas = _.valuesIn(merge);
    const [normDatas, scaler] = scaling(meansDatas, true);

    const kmeans = new KMeans(normDatas);
    kmeans.setCentroids();
    for (let _ of kmeans);

    // Label Sorting 작업이 필요하고,
    if (kmeans.sorting) kmeans.sorting();

    // Adjusting 작업이 필요함 (여기서 파이썬 프로그램이 붙어주면 됨)
    if (kmeans.adjust) kmeans.adjust();

    const start = this.size * (this.cursor - 1);
    const end = this.size * this.cursor - 1;
    const labels = kmeans.labels!;
    const centroids = scaler!.reverseTransform(kmeans.centroids!);

    this.memory.push(new TimeDivisionMemory(start, end, labels, centroids));
    console.log(this.memory.length);
    // console.log(this.memory);
  }

  [Symbol.iterator]() {
    return this;
  }
  next(...args: [] | [undefined]): IteratorResult<TimeDivisionMemory, any> {
    if (this.isEnd) return { value: null, done: true };

    this.round();
    return { value: _.takeRight(this.memory, 1)[0], done: false };
  }
}

export default TimeDivisionKMeans;
