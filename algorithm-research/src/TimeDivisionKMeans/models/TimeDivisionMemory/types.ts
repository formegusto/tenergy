import { Schema } from "mongoose";
import { TimeDivisionMemoryModel } from ".";
import _ from "lodash";

export interface ITimeLabelingData {
  time: Date;
  value: number;
}

export class TimeLabelingData {
  time: Date;
  value: number;

  constructor(time: Date, value: number) {
    this.time = time;
    this.value = value;
  }

  static generateArray(datas: number[], timeIdx: Date[]) {
    return _.map(
      _.zip(datas, timeIdx),
      ([value, time]) => new TimeLabelingData(time!, value!)
    );
  }
}

export interface ITimeDivisionMemory {
  _id?: Schema.Types.ObjectId | string;

  start: number;
  end: number;
  labels: number[];
  centroids: number[][];

  createdAt?: Date;
  updatedAt?: Date;
}

export class TimeDivisionMemory implements ITimeDivisionMemory {
  start: number;
  end: number;
  labels: number[];
  centroids: number[][];

  constructor(
    start: number,
    end: number,
    labels: number[],
    centroids: number[][]
  ) {
    this.start = start;
    this.end = end;
    this.labels = labels;
    this.centroids = centroids;
  }

  static getFromDoc(document: ITimeDivisionMemory) {
    return new TimeDivisionMemory(
      document.start,
      document.end,
      document.labels,
      document.centroids
    );
  }

  async save() {
    await TimeDivisionMemoryModel.create(this);
  }
}
