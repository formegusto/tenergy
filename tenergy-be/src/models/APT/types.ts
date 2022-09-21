import {
  HouseholdModel,
  TimeMeterDataModel,
  EnergyTradeModel,
  CompareModel,
} from "@models";
import {
  TimeMeterData,
  Household,
  IEnergyTrade,
  ICompare,
} from "@models/types";
import _ from "lodash";

export class APT {
  publicPercentage: number;
  householdCount?: number;
  householdPart?: number;

  // Pattern Type Data
  timeMeterDatas?: Array<TimeMeterData>;

  self?: Household;
  households?: Array<Household>;
  trades?: Array<IEnergyTrade>;

  compares?: Array<ICompare>;

  constructor(publicPercentage?: number) {
    this.publicPercentage = publicPercentage ? publicPercentage : 30;
  }

  async addTimeMeterDatas() {
    const _timeMeterDatas = await TimeMeterDataModel.find(
      {},
      {},
      { sort: { time: 1 } }
    );
    this.timeMeterDatas = _.map(_timeMeterDatas, TimeMeterData.getFromDoc);
    this.householdCount = this.timeMeterDatas[0].data.length;
    this.householdPart = Math.round(
      _.sumBy(this.timeMeterDatas, (timeMeter) => timeMeter.sum)
    );
  }

  async addHouseholds() {
    const householdDocs = await HouseholdModel.find({}, { _id: 0, name: 1 });
    const householdNames = _.map(householdDocs, ({ name }) => name);
    this.households = await Promise.all(_.map(householdNames, Household.init));
    this.householdCount = this.households.length;
    this.householdPart = Math.round(_.sumBy(this.households, ({ kwh }) => kwh));

    this.self = new Household(
      "APT",
      [Math.round(this.usage / this.households.length)],
      []
    );
  }

  async addTrades() {
    this.trades = await EnergyTradeModel.find();
  }

  async addCompares() {
    this.compares = await CompareModel.find();
    this.households = _.map(
      this.compares,
      ({ name, after }) => new Household(name, [after.kwh], [])
    );
    this.householdCount = this.compares.length;
    this.householdPart = Math.round(
      _.sumBy(this.compares, ({ after }) => after.kwh)
    );

    this.self = new Household(
      "APT",
      [Math.round(this.usage / this.households.length)],
      []
    );
  }

  /* 사용량 파트 */
  // 아파트 전체 사용량
  get usage() {
    return Math.round(
      (this.householdPart! * 100) / (100 - this.publicPercentage)
    );
  }
  get meanUsage() {
    return Math.round(this.usage / this.householdCount!);
  }

  // 세대부 사용량
  get meanHouseholdPart() {
    return Math.round(this.householdPart! / this.householdCount!);
  }

  // 공용부 사용량
  get publicPart() {
    return this.usage - this.householdPart!;
  }
  get meanPublicPart() {
    return Math.round(this.publicPart / this.householdCount!);
  }

  get tradePart() {
    return this.trades ? _.sumBy(this.trades, ({ quantity }) => quantity) : 0;
  }
  get meanTradePart() {
    return Math.round(this.tradePart / this.householdCount!);
  }

  /* 가격 파트 */
  get bill() {
    return this.self!.bill * this.households!.length;
  }
  get householdBill() {
    return _.sumBy(this.households, (household) => household.bill);
  }
  get publicBill() {
    return this.bill - this.householdBill;
  }
  get tradeBill() {
    return this.trades
      ? Math.round(_.sumBy(this.trades, ({ price }) => price))
      : 0;
  }

  // Extensions
  get householdsSteps() {
    return _.map(this.households, (household) => household.steps);
  }

  get steps() {
    return _.map(this.self!.steps, (step) => step * this.households!.length);
  }
}
