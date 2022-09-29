export type HouseholdPriceType = "elecBill" | "public" | "trade" | "bill";
export type HouseholdPrice = {
  [key in HouseholdPriceType]: number;
};

export type HouseholdPublicType = "group" | "price" | "contribution" | "err";
export type HouseholdPublic = {
  [key in HouseholdPublicType]: number;
};

export interface ResGetHouseholdInformation {
  usage: number;
  chart: number[];
  price: HouseholdPrice;
}

export interface ResGetHouseholdPublic {
  my: HouseholdPublic;
  contributions: number[];
}
