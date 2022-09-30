import { IPart } from "@component/common/types";

export interface APT {
  price: PriceAndUsage;
  usage: PriceAndUsage;
}

export type PriceAndUsage = {
  [key in IPart]: number;
};

export interface DetailData {
  title: string;
  price: number;
  usage: number;
  keys: string[];
  values: number[];
}

export interface NameLabelData {
  name: string;
  value: number;
}

export type IHouseholdPart = "elecBill" | "public" | "trade" | "bill";

export type IHousehold = {
  [key in IHouseholdPart]: number;
};
