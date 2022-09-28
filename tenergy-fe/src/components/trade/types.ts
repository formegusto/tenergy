import { TradeDetailKey, TradeRole } from "@api/types";

export type TradeTitle = {
  [key in TradeDetailKey]: string;
};

export interface TradeRoleViewProps {
  role: TradeRole;
}
