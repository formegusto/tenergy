import APT from "../APT";
import _ from "lodash";
import { CompareHousehold } from "./types";

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

    const beforePriPublic = this.before.publicBill / householdCount;
    const afterPriPublic = this.after.publicBill / householdCount;

    return _.map(this.before.households, (before) => {
      const after = _.find(
        this.after.households,
        (household) => household.name === before.name
      );

      const beforeBill = before.bill + beforePriPublic;
      const afterBill = after!.bill + afterPriPublic;

      return {
        name: before.name,
        before: { kwh: before.kwh, price: beforeBill },
        after: { kwh: after!.kwh, price: afterBill },
        err: afterBill - beforeBill,
      };
    }) as CompareHousehold[];
  }
}

export default TradeAnalyzer;
