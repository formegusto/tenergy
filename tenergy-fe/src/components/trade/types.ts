import { TradeDetailKey } from "@api/types";

export type TradeTitle = {
  [key in TradeDetailKey]: string;
};
