import { Schema } from "mongoose";

export interface IEnergyTrade {
  _id?: Schema.Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
}
