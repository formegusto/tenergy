import { TimeMeterDataModel } from "@models/TimeMeterData";
import { TimeMeterData } from "@models/types";
import _ from "lodash";

export class APT {
  publicPercentage: number;
  timeMeterDatas: Array<TimeMeterData>;

  constructor(timeMeterDatas: Array<TimeMeterData>, publicPercentage?: number) {
    this.timeMeterDatas = timeMeterDatas;
    this.publicPercentage = publicPercentage ? publicPercentage : 30;
  }

  static async init(publicPercentage?: number) {
    const _timeMeterDatas = await TimeMeterDataModel.find(
      {},
      {},
      { sort: { time: 1 } }
    );
    const timeMeterDatas = _.map(_timeMeterDatas, TimeMeterData.getFromDoc);

    return new APT(timeMeterDatas, publicPercentage);
  }

  // 아파트 전체 사용량
  get usage() {
    return Math.round(
      (this.householdPart * 100) / (100 - this.publicPercentage)
    );
  }

  // 세대부 사용량
  get householdPart() {
    return Math.round(
      _.sumBy(this.timeMeterDatas, (timeMeter) => timeMeter.sum)
    );
  }

  // 공용부 사용량
  get publicPart() {
    return this.usage - this.householdPart;
  }
}
