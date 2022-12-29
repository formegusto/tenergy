import { Schema } from "mongoose";
import _ from "lodash";
import { TimeMeterDataModel } from ".";

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

  static async get(skipSize: number, limitSize: number) {
    const timeMeterData = await TimeMeterDataModel.find(
      {},
      { __v: 0 },
      { sort: { time: 1 } }
    )
      .skip(skipSize)
      .limit(limitSize);

    return _.map(timeMeterData, (document) =>
      TimeMeterData.getFromDoc(document)
    );
  }

  static async getTimeIndex() {
    const times = await TimeMeterDataModel.find({}, {}, { sort: { time: 1 } });

    return _.map(times, ({ time }) => time);
  }

  static async save(time: Date, data: MeterData[]) {
    await TimeMeterDataModel.create({ time, data });
  }
}
