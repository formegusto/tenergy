import { Schema } from "mongoose";
import { TimeMeterDataModel } from "../TimeMeterData";
import _ from "lodash";
import { monthToSeason } from "../../utils";
import { BASIC, ELECRATE, NUGIN_ERR, NUGIN_STEP } from "../../common";
import { TimeDivisionMemoryModel } from "../TimeDivisionMemory";

export interface IHousehod {
  _id?: Schema.Types.ObjectId | string;
  name: string;
  createdAt?: Date;
}

export class Household {
  month: number;
  name: string;
  pat!: number[];
  conts!: number[];
  group?: number;

  constructor(name: string, pat: number[], conts: number[]) {
    this.month = 1;
    this.name = name;
    this.pat = pat;
    this.conts = conts;
  }

  get kwh() {
    return Math.round(_.sum(this.pat));
  }

  get steps(): Array<number> {
    // 1. 각 단계별 차이를 구한다.
    let steps = _.map(
      NUGIN_STEP[monthToSeason(this.month!)],
      (v) => this.kwh - v
    );
    // console.log(steps);

    // 2. 각 단계별 오차보다 큰지 확인한다. 작으면 해당 단계의 가구이다.
    steps = _.map(steps, (v, idx) =>
      v < NUGIN_ERR[monthToSeason(this.month!)][idx]
        ? v
        : NUGIN_ERR[monthToSeason(this.month!)][idx]
    );
    // console.log(steps);

    // 3. 0을 걸러준다.
    steps = _.map(steps, (v) => (v > 0 ? v : 0));
    // console.log(steps);

    return steps;
  }

  get step(): number {
    return _.findLastIndex(this.steps, (v) => v !== 0);
  }

  get basic(): number {
    return BASIC[this.step];
  }

  get elecRate(): number {
    const steps = this.steps;

    return Math.round(
      _.reduce(
        ELECRATE,
        (acc: number, rate: number, idx: number) => acc + rate * steps[idx],
        0
      )
    );
  }

  get bill(): number {
    return this.basic + this.elecRate;
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

    const contributions = await TimeDivisionMemoryModel.aggregate([
      {
        $project: {
          labels: {
            $filter: {
              input: "$labels",
              as: "label",
              cond: { $eq: ["$$label.name", name] },
            },
          },
        },
      },
    ]).sort({ createdAt: "asc" });
    const conts = _.map(
      _.flatten(_.map(contributions, ({ labels }) => labels)),
      ({ value }) => value
    ) as number[];

    return new Household(name, pat, conts);
  }
}
