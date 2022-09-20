import { model, Schema } from "mongoose";
import { IEnergyTrade } from "./types";

const EnergyTradeSchema = new Schema<IEnergyTrade>(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    collection: "EnergyTrade",
  }
);

export const EnergyTradeModel = model<typeof EnergyTradeSchema>(
  "EnergyTrade",
  EnergyTradeSchema
);
