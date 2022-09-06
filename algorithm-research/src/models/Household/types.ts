import { Schema } from "mongoose";
import { TimeMeterDataModel } from "../TimeMeterData";
import _ from "lodash";

export interface IHousehod {
  _id?: Schema.Types.ObjectId | string;
  name: string;
  createdAt?: Date;
}

export class Household {
  name: string;
  pat?: number[];
  group?: number;

  constructor(name: string, pat: number[]) {
    this.name = name;
    this.pat = pat;
  }

  static async init(name: string) {
    const meterDatas = await TimeMeterDataModel.aggregate([
      {
        $project: {
          data: {
            $filter: {
              input: "$data",
              as: "d",
              cond: { $eq: ["$$d.name", name] },
            },
          },
          time: 1,
        },
      },
    ]).sort({ time: "asc" });
    const pat = _.map(
      _.flatten(_.map(meterDatas, ({ data }) => data)),
      ({ kwh }) => kwh
    );

    return new Household(name, pat);
  }
}
