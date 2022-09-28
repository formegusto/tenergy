export type ResGetTrade = {
  [key in string]: number;
};

export type ResGetTradeDetail = {
  [key in TradeDetailKey]: TradeDetailData;
};

export type TradeDetailKey = "price" | "usage";

export type TradeDetailData = {
  [key in "value" | "mean" | "min" | "max"]: number;
};

export type ResGetCompare = Compare[];

export interface Compare {
  _id: string;
  name: string;
  before: CompareItem;
  after: CompareItem;
  err: CompareItem;
  role: TradeRole;
}

export interface CompareItem {
  kwh: number;
  bill: number;
  public: number;
}

export type TradeRole = "SELLER" | "BUYER" | "NONE";
