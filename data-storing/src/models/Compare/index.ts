import { model, Schema } from "mongoose";
import { ICompare } from "./types";

const CompareSchema = new Schema<ICompare>(
  {
    name: { type: String, required: true },
    before: { type: Schema.Types.Mixed, required: true },
    after: { type: Schema.Types.Mixed, required: true },
    err: { type: Schema.Types.Mixed, required: true },
    role: { type: String, required: true },
  },
  {
    collection: "Compare",
  }
);

export const CompareModel = model<typeof CompareSchema>(
  "Compare",
  CompareSchema
);
