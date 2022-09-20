import { Schema } from "mongoose";

export interface CompareHouseholdItem {
  kwh: number;
  bill: number;
  public: number;
}

export interface ICompare {
  _id?: Schema.Types.ObjectId;
  name: string;
  before: CompareHouseholdItem;
  after: CompareHouseholdItem;
  err: CompareHouseholdItem;
  role: "SELLER" | "BUYER" | "NONE";
}
