import { model, Schema } from "mongoose";
import { IHousehold } from "./types";

const HouseholdSchema = new Schema<IHousehold>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "Household",
  }
);

export const HouseholdModel = model<typeof HouseholdSchema>(
  "Household",
  HouseholdSchema
);
