import _ from "lodash";
import KMeans from "../KMeans";
import { scaling } from "../MinMaxScaler/scailing";
import {
  TimeMeterData,
  TimeDivisionMemory,
  INameLabelingData,
  Household,
} from "@model/types";
import { datasToUsages } from "./utils";

class TimeDivisionKMeans implements Iterator<TimeDivisionMemory> {
  size: number;
  cursor: number;
  datas: TimeMeterData[];

  memory: TimeDivisionMemory[];
  isEnd: boolean;

  private households?: Household[];

  constructor(size: number) {
    this.size = size;
    this.cursor = 0;
    this.datas = [];
    this.memory = [];
    this.isEnd = false;
  }

  // KMeans Process
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
    const householdNames = _.map(takeDatas[0].data, ({ name }) => name);
    const meansDatas = datasToUsages(takeDatas);
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
    const labels: INameLabelingData[] = _.map(
      _.zip(householdNames!, kmeans.labels!),
      ([name, value]) => ({ name: name!, value: value! })
    );
    const centroids = scaler!.reverseTransform(kmeans.centroids!);

    this.memory.push(new TimeDivisionMemory(start, end, labels, centroids));
    console.log(this.memory.length);
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
