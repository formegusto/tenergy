import APT from "../APT";
import { NUGIN_ERR } from "../common";
import { monthToSeason } from "../utils";
import _ from "lodash";
import { Household } from "../models/types";
import { demandFunction } from "./utils";
import { TradeResult } from "./types";

class EnergyTrade {
  month: number;
  apt: APT;
  tradeUnit: number;
  tradeUsable: number;

  sellers!: Household[];
  buyers!: Household[];

  constructor(month: number, apt: APT, tradeUnit: number, tradeUsable: number) {
    this.month = month;
    this.apt = apt;
    this.tradeUnit = tradeUnit;
    this.tradeUsable = tradeUsable;
  }

  // 가장 이득을 줄  수 있는 buyer 탐색
  searchBuyer() {
    const resultTest = _.map(
      this.buyers,
      (buyer) =>
        ({
          name: buyer.name,
          quantity: this.tradeUnit,
          price: demandFunction(buyer.kwh, this.tradeUnit, this.month),
        } as TradeResult)
    );

    return _.sortBy(resultTest, (result) => result.price * -1)[0];
  }

  settingRole() {
    const nuginMax = NUGIN_ERR[monthToSeason(this.month)][0];

    this.sellers = _.filter(
      this.apt.households,
      (household) => household.kwh < nuginMax
    );
    this.buyers = _.filter(
      this.apt.households,
      (Household) => Household.kwh >= nuginMax
    );
  }

  static async init(tradeUnit: number) {
    const month = 1;
    const nuginMax = NUGIN_ERR[monthToSeason(month)][0];

    const apt = await APT.init(30);
    const tradeUsable = _.sumBy(
      _.filter(apt.households, (household) => household.kwh < nuginMax),
      (household) => nuginMax - household.kwh
    );
    const eTrade = new EnergyTrade(month, apt, tradeUnit, tradeUsable);
    eTrade.settingRole();

    return eTrade;
  }
}

export default EnergyTrade;
