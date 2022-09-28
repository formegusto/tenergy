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
