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
export interface BeforeAndAfter {
  before: number;
  after: number;
}
export interface MyAndCentroids {
  my: number[];
  centroids: number[];
}

export type FeedbackType = "day" | "time";
export interface ResGetHouseholdFeedback {
  type: FeedbackType;
  size: number;
  dangerProposal: string[];
  warningProposal: string[];
  price: BeforeAndAfter;
  usage: BeforeAndAfter;
  patterns: {
    [key: string]: MyAndCentroids;
  };
}
