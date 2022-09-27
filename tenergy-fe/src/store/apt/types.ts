import { IPart } from "@component/common/types";

export interface APT {
  price: PriceAndUsage;
  usage: PriceAndUsage;
}

export type PriceAndUsage = {
  [key in IPart]: number;
};
