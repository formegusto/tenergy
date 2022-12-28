import { Schema } from "mongoose";

export interface IMeterData {
  name: string;
  kwh: number;
}

export interface ITimeMeterData {
  _id?: Schema.Types.ObjectId;

  time: Date;
  data: IMeterData[];

  createdAt?: Date;
  updatedAt?: Date;
}

export class TimeMeterData implements ITimeMeterData {
  _id!: Schema.Types.ObjectId;

  time!: Date;
  data!: IMeterData[];

  createdAt!: Date;
  updatedAt!: Date;

  constructor(model: ITimeMeterData) {
    Object.assign(this, model);
  }
}
