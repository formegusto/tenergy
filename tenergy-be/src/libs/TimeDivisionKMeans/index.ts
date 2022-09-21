import _ from "lodash";
import {
  FeedbackTarget,
  IFeedbackTarget,
  IFeedbackTargetMaterial,
} from "../Feedback/types";
import KMeans from "../KMeans";
import { scaling } from "../MinMaxScaler/scailing";
import { TimeDivisionMemoryModel } from "@models";
import {
  TimeMeterData,
  TimeDivisionMemory,
  TimeLabelingData,
  NameLabelingData,
  INameLabelingData,
  Household,
} from "@models/types";
import { dataDivisionBySize, datasToUsages } from "./utils";

class TimeDivisionKMeans implements Iterator<TimeDivisionMemory> {
  size: number;
  cursor: number;
  datas: TimeMeterData[];

  memory: TimeDivisionMemory[];
  isEnd: boolean;

  private households?: Household[];
  getHousehold?: (name: string) => {
    self: Household;
    feedbackMaterial: IFeedbackTargetMaterial;
  } | null;

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

  async result() {
    const onlyUsages = datasToUsages(this.datas);

    const householdNames = _.map(this.datas[0].data, ({ name }) => name);
    const households = await Promise.all(_.map(householdNames, Household.init));

    const householdUsages = _.sumBy(households, (household) => household.kwh);

    const chunked = dataDivisionBySize(onlyUsages, this.size);
    const dayHouseholdUsages = _.map(chunked, (chunk) =>
      _.sum(_.flatten(chunk))
    );
    const weights = _.map(dayHouseholdUsages, (dh) => dh / householdUsages);
    const weightTotal = _.sum(weights);

    const contributeMap = _.map(households, (household) => household.conts);
    const groups = _.map(contributeMap, (contributes, idx) => {
      const zipDatas = _.zip(contributes, weights);
      const multiplies = _.map(zipDatas, (data) =>
        _.multiply.apply(null, data as [number, number])
      );
      const group = Math.round(_.sum(multiplies) / weightTotal);
      households[idx].group = group;
      return group;
    });

    const sortedUniqGroups = _.sortBy(_.uniq(groups));
    const centroids: number[][] = [];
    const centroidsContributeMap: number[][] = [];

    for (let group of sortedUniqGroups) {
      let parsed = _.filter(onlyUsages, (_, idx) => groups[idx] === group);
      // let meanParsed = _.map(_.zip.apply(null, parsed), _.mean);
      let centroid = _.map(_.zip.apply(null, parsed), _.mean);

      // const groupChunked = _.chunk(meanParsed, this.size);
      // const centroid = _.map(groupChunked, _.sum);
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

    // time labeling
    const timeIdx = await TimeMeterData.getTimeIndex();
    const sliceTimeIdx = (
      _.zip.apply(null, _.chunk(timeIdx, this.size)) as Date[][]
    )[0];

    this.households = households;
    this.getHousehold = (name: string) => {
      const finded = _.find(
        this.households,
        (household) => household.name === name
      );

      if (finded)
        return {
          self: finded,
          feedbackMaterial: {
            pat: _.map(finded.pat, (p, idx) => ({
              time: timeIdx[idx],
              value: p,
            })),
            conts: _.map(finded.conts, (c, idx) => ({
              time: sliceTimeIdx[idx],
              value: c,
            })),
          },
        };
      else return null;
    };

    return {
      groups: NameLabelingData.generateArray(groups, householdNames),
      contributeMap: _.map(contributeMap, (contributes) =>
        TimeLabelingData.generateArray(contributes, sliceTimeIdx)
      ),
      centroids: _.map(centroids, (centroid) =>
        TimeLabelingData.generateArray(centroid, timeIdx)
      ),
      centroidsContributeMap: _.map(
        centroidsContributeMap,
        (centroidContributes) =>
          TimeLabelingData.generateArray(centroidContributes, sliceTimeIdx)
      ),
    };
  }

  // 해당 서비스에서 time의 개념은 hour의 개념
  async times(
    group: number
  ): Promise<
    [nowFeedbackTarget: IFeedbackTarget, prevFeedbackTarget: IFeedbackTarget]
  > {
    const { centroids, centroidsContributeMap } = await this.result();

    const nowFeedbackTarget = new FeedbackTarget({
      pat: centroids[group],
      conts: centroidsContributeMap[group],
    });
    const prevFeedbackTarget = new FeedbackTarget({
      pat: centroids[group - 1],
      conts: centroidsContributeMap[group - 1],
    });

    return [
      nowFeedbackTarget.getTimes(this.size),
      prevFeedbackTarget.getTimes(this.size),
    ];
  }

  async days(
    group: number
  ): Promise<
    [nowFeedbackTarget: IFeedbackTarget, prevFeedbackTarget: IFeedbackTarget]
  > {
    const { centroids, centroidsContributeMap } = await this.result();

    const nowFeedbackTarget = new FeedbackTarget({
      pat: centroids[group],
      conts: centroidsContributeMap[group],
    });
    const prevFeedbackTarget = new FeedbackTarget({
      pat: centroids[group - 1],
      conts: centroidsContributeMap[group - 1],
    });

    return [nowFeedbackTarget.getDays(), prevFeedbackTarget.getDays()];
  }
}

export default TimeDivisionKMeans;
