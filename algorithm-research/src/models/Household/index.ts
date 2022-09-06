import { model, Schema } from "mongoose";
import { IHousehod } from "./types";

const HouseholdSchema = new Schema<IHousehod>(
  {
    name: { type: String, required: true },
    createdAt: { type: Date, required: false },
  },
  {
    collection: "Household",
  }
);

export const HouseholdModel = model<typeof HouseholdSchema>(
  "Household",
  HouseholdSchema
);
