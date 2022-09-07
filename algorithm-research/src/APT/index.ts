import { HouseholdModel } from "../models";
import { Household } from "../models/types";
import _ from "lodash";

class APT {
  // 아파트 전체 사용량
  apt: Household;
  usage: number;
  // 세대부 총 사용량
  householdPart: number;
  // 공용부 총 사용량
  publicPart: number;

  households: Household[];
  publicPercentage: number;

  constructor(households: Household[], publicPercentage: number) {
    this.householdPart = _.sumBy(households, (household) => household.kwh);
    this.usage = Math.round(
      (this.householdPart * 100) / (100 - publicPercentage)
    );
    this.publicPart = this.usage - this.householdPart;
    this.apt = new Household(
      "APT",
      [this.usage / Math.round(households.length)],
      []
    );
    this.households = households;
    this.publicPercentage = publicPercentage;
  }

  get bill() {
    return this.apt.bill * this.households.length;
  }
  get householdBill() {
    return _.sumBy(this.households, (household) => household.bill);
  }
  get publicBill() {
    return this.bill - this.householdBill;
  }

  show() {
    console.log(
      `APT - ${this.usage.toLocaleString(
        "ko-KR"
      )}, 세대부 - ${this.householdPart.toLocaleString(
        "ko-KR"
      )}, 공용부 - ${this.publicPart.toLocaleString("ko-KR")}`
    );
    console.log(
      `APT - ${this.bill.toLocaleString(
        "ko-KR"
      )}, 세대부 - ${this.householdBill.toLocaleString(
        "ko-KR"
      )}, 공용부 - ${this.publicBill.toLocaleString("ko-KR")}`
    );
  }

  static async init(publicPercentage: number) {
    const householdDocs = await HouseholdModel.find({}, { _id: 0, name: 1 });
    const householdNames = _.map(householdDocs, ({ name }) => name);

    const households = await Promise.all(
      _.map(householdNames, (name) => Household.init(name))
    );

    return new APT(households, publicPercentage);
  }
}

export default APT;
