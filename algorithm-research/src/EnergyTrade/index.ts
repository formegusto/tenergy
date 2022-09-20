import APT from "../APT";
import { NUGIN_ERR } from "../common";
import { monthToSeason } from "../utils";
import _ from "lodash";
import { Household } from "../models/types";
import { demandFunction } from "./utils";
import { TradeResult } from "./types";
import TradeAnalyzer from "./analyzer";
import { EnergyTradeModel } from "../models";

class EnergyTrade implements Iterator<TradeResult> {
  month: number;
  apt: APT;
  tradeUnit: number;
  tradeUsable: number;

  sellers!: Household[];
  buyers!: Household[];

  results: TradeResult[];

  tradeHouseholds?: Household[];

  constructor(month: number, apt: APT, tradeUnit: number, tradeUsable: number) {
    this.month = month;
    this.apt = apt;
    this.tradeUnit = tradeUnit;
    this.tradeUsable = tradeUsable;
    this.results = [];
  }

  [Symbol.iterator]() {
    return this;
  }
  next() {
    const buyer = this.searchMaxBuyer();
    this.tradeUsable -= buyer.quantity;

    const finded = _.find(this.buyers, (_buyer) => _buyer.name === buyer.name);
    finded!.tradeKwh += buyer.quantity;
    this.results.push(buyer);

    if (this.tradeUsable === 0) return { value: buyer, done: true };
    else return { value: buyer, done: false };
  }
  // 가장 이득을 줄  수 있는 buyer 탐색
  searchMaxBuyer() {
    const tradeQuantity =
      this.tradeUsable > this.tradeUnit ? this.tradeUnit : this.tradeUsable;

    const resultTest = _.map(
      this.buyers,
      (buyer) =>
        ({
          name: buyer.name,
          quantity: tradeQuantity,
          price: demandFunction(buyer.kwh, this.tradeUnit, this.month),
        } as TradeResult)
    );

    return _.sortBy(resultTest, (result) => result.price * -1)[0];
  }

  // 마무리 정리 (seller)
  clean() {
    const nuginMax = NUGIN_ERR[monthToSeason(this.month)][0];

    const buyerTotalPrices = _.mapValues(
      _.groupBy(this.results, (result) => result.name),
      (value) => _.sumBy(value, (v) => v.price)
    );

    const sellerBenefitTotal = _.sum(_.values(buyerTotalPrices));
    const sellerBenefit = Math.round(sellerBenefitTotal / this.sellers.length);

    // Seller kwh 변경
    // seller 객체에 benefit 주입
    this.sellers.forEach((seller) => {
      seller.tradeKwh = -(nuginMax - seller.kwh);
      seller.benefit = sellerBenefit;
    });

    // buyer 객체에 benefit 주입
    _.forOwn(buyerTotalPrices, (value, key) => {
      const finded = _.find(this.buyers, (buyer) => buyer.name === key);
      finded!.loss = value;
    });
    const tradeHouseholds = _.concat(this.sellers, this.buyers);

    this.tradeHouseholds = tradeHouseholds;

    return new TradeAnalyzer(
      this.apt,
      new APT(tradeHouseholds, this.apt.publicPercentage)
    );
  }

  async save() {
    for (let result of this.results) await EnergyTradeModel.create(result);
  }

  settingRole() {
    const nuginMax = NUGIN_ERR[monthToSeason(this.month)][0];

    this.sellers = _.cloneDeep(
      _.filter(this.apt.households, (household) => household.kwh < nuginMax)
    );
    this.buyers = _.cloneDeep(
      _.filter(this.apt.households, (Household) => Household.kwh >= nuginMax)
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
