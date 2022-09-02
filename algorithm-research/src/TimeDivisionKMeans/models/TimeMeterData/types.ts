import { Schema } from "mongoose";
import { TimeMeterDataModel } from ".";
import _ from "lodash";

export interface MeterData {
  name: string;
  kwh: number;
}

export interface ITimeMeterData {
  _id?: Schema.Types.ObjectId | string;
  time: Date;
  data: MeterData[];
}

export class TimeMeterData implements ITimeMeterData {
  _id?: Schema.Types.ObjectId | string;
  time!: Date;
  data!: MeterData[];

  constructor(
    time: Date,
    data: MeterData[],
    _id?: Schema.Types.ObjectId | string
  ) {
    this.time = time;
    this.data = data;
    this._id = _id;
  }

  static getFromDocument(document: ITimeMeterData) {
    return new TimeMeterData(document.time, document.data, document._id);
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
      TimeMeterData.getFromDocument(document)
    );
  }
}
