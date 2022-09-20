import { Schema } from "mongoose";
import _ from "lodash";

export interface IHousehold {
  _id?: Schema.Types.ObjectId;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Household {
  month: number;
  name: string;
  pat: number[];

  tradeKwh: number;
  benefit: number;
  loss: number;

  constructor(name: string, pat: number[]) {
    this.month = 1;
    this.name = name;
    this.pat = pat;
    this.tradeKwh = 0;
    this.benefit = 0;
    this.loss = 0;
  }

  get kwh() {
    return Math.round(_.sum(this.pat));
  }
}
