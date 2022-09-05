import _ from "lodash";
import KMeans from "../KMeans";
import { scaling } from "../MinMaxScaler/scailing";
import { TimeDivisionMemoryModel } from "./models";
import { TimeMeterData, TimeDivisionMemory } from "./models/types";
import { dataDivisionBySize, datasToUsages } from "./utils";

class TimeDivisionKMeans implements Iterator<TimeDivisionMemory> {
  size: number;
  cursor: number;
  datas: TimeMeterData[];

  memory: TimeDivisionMemory[];
  isEnd: boolean;

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

  // TimeDivisionKMeans Setting
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

  get result() {
    const onlyUsages = datasToUsages(this.datas);
    const householdUsages = _.sum(_.flatten(onlyUsages));

    const chunked = dataDivisionBySize(onlyUsages, this.size);
    const dayHouseholdUsages = _.map(chunked, (chunk) =>
      _.sum(_.flatten(chunk))
    );
    const weights = _.map(dayHouseholdUsages, (dh) => dh / householdUsages);
    const weightTotal = _.sum(weights);

    const contributeMap = _.zip.apply(
      null,
      _.map(this.memory, ({ labels }) => labels)
    );
    const groups = _.map(contributeMap, (contributes) => {
      const zipDatas = _.zip(contributes, weights);
      const multiplies = _.map(zipDatas, (data) =>
        _.multiply.apply(null, data as [number, number])
      );
      return Math.round(_.sum(multiplies) / weightTotal);
    });

    const sortedUniqGroups = _.sortBy(_.uniq(groups));
    const centroids: number[][] = [];
    const centroidsContributeMap: number[][] = [];

    for (let group of sortedUniqGroups) {
      let parsed = _.filter(onlyUsages, (_, idx) => groups[idx] === group);
      let meanParsed = _.map(_.zip.apply(null, parsed), _.mean);

      // console.log(groupChunked);
      const groupChunked = _.chunk(meanParsed, this.size);
      const centroid = _.map(groupChunked, _.sum);
      centroids.push(centroid);

      parsed = _.filter(
        contributeMap,
        (_, idx) => groups[idx] === group
      ) as any[];

      const centroidContributeMap = _.map(_.zip.apply(null, parsed), (data) =>
        Math.round(_.mean(data))
      );
      centroidsContributeMap.push(centroidContributeMap);
    }

    return {
      contributeMap,
      groups,
      centroids,
      centroidsContributeMap,
    };
  }

  async times() {
    const timeIdxes = await TimeMeterData.getTimeIndex();

    return 0;
  }

  async days() {
    return 0;
  }
}

export default TimeDivisionKMeans;
