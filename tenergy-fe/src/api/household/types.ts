export type HouseholdPriceType = "elecBill" | "public" | "trade" | "bill";
export type HouseholdPrice = {
  [key in HouseholdPriceType]: number;
};

export interface ResGetHouseholdInformation {
  usage: number;
  chart: number[];
  price: HouseholdPrice;
}
