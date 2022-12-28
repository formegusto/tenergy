import { Schema } from "mongoose";
import { TimeMeterDataModel } from ".";

export interface IMeterData {
  name: string;
  kwh: number;
}

export interface ITimeMeterData {
  _id?: Schema.Types.ObjectId;

  time: Date;
  data: IMeterData[];
}

export class TimeMeterData implements ITimeMeterData {
  _id!: Schema.Types.ObjectId;

  time!: Date;
  data!: IMeterData[];

  constructor(model: ITimeMeterData) {
    Object.assign(this, model);
  }

  static async save(time: Date, data: IMeterData[]) {
    await TimeMeterDataModel.create({ time, data });
  }
}
