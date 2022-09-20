import { Schema } from "mongoose";

export interface INameLabelingData {
  name: string;
  value: number;
}

export interface ITimeDivisionMemory {
  _id?: Schema.Types.ObjectId | string;

  start: number;
  end: number;
  labels: INameLabelingData[];
  centroids: number[][];

  createdAt?: Date;
  updatedAt?: Date;
}
