import APT from "../APT";
import _ from "lodash";
import { CompareHousehold } from "./types";
import { CompareModel } from "@model";

class TradeAnalyzer {
  before: APT;
  after: APT;

  constructor(beforeAPT: APT, afterAPT: APT) {
    this.before = beforeAPT;
    this.after = afterAPT;
  }

  get householdPartBill() {
    return {
      before: this.before.householdBill,
      after: this.after.householdBill,
    };
  }

  get publicPartBill() {
    return {
      before: this.before.publicBill,
      after: this.after.publicBill,
    };
  }

  get householdCompare(): CompareHousehold[] {
    const householdCount = this.before.households.length;

    const beforePriPublic = Math.round(this.before.publicBill / householdCount);
    const afterPriPublic = Math.round(this.after.publicBill / householdCount);

    return _.map(this.before.households, (before) => {
      const after = _.find(
        this.after.households,
        (household) => household.name === before.name
      );

      // const beforeBill = before.bill + beforePriPublic;
      // const afterBill = after!.bill + afterPriPublic;

      return {
        name: before.name,
        before: { kwh: before.kwh, bill: before.bill, public: beforePriPublic },
        after: { kwh: after!.kwh, bill: after!.bill, public: afterPriPublic },
        err: {
          kwh: after!.kwh - before.kwh,
          bill: after!.bill - before.bill,
          public: afterPriPublic - beforePriPublic,
        },
        role:
          before.kwh < after!.kwh
            ? "SELLER"
            : before.kwh > after!.kwh
            ? "BUYER"
            : "NONE",
      };
    }) as CompareHousehold[];
  }

  async save() {
    const householdCompares = this.householdCompare;
    for (let compare of householdCompares) {
      await CompareModel.create(compare);
    }
  }
}

export default TradeAnalyzer;
