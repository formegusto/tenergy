import { IPart } from "@component/common/types";

export type FileStatus = "PENDING" | "READY" | "STEP1" | "STEP2" | "ACTIVE";

export interface Manager {
  _id: string;
  buildingName: string;
  year: number;
  month: number;
  comment: string;
  path: string;
  status: FileStatus;
  createdAt: Date;
  updatedAt: Date;
}

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
