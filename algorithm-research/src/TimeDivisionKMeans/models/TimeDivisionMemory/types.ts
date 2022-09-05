import { Schema } from "mongoose";
import { TimeDivisionMemoryModel } from ".";

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
