import { Schema } from "mongoose";
import _ from "lodash";

export interface MeterData {
  name: string;
  kwh: number;
}

export interface ITimeMeterData {
  _id?: Schema.Types.ObjectId;
  time: Date;
  data: Array<MeterData>;

  createdAt?: Date;
  updatedAt?: Date;
}

export class TimeMeterData implements ITimeMeterData {
  _id?: Schema.Types.ObjectId;

  time: Date;
  data: Array<MeterData>;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(time: Date, data: Array<MeterData>) {
    this.time = time;
    this.data = data;
  }

  static getFromDoc(timeMeterDataDoc: ITimeMeterData) {
    const { time, data } = timeMeterDataDoc;
    return new TimeMeterData(time, data);
  }

  get sum() {
    return _.sumBy(this.data, ({ kwh }) => kwh);
  }
}
