import { model, Schema } from "mongoose";
import { ITimeDivisionMemory } from "./types";

const TimeDivisionMemorySchema = new Schema<ITimeDivisionMemory>(
  {
    start: { type: Number, required: true },
    end: { type: Number, required: true },
    labels: [{ type: Number, required: true }],
    centroids: [[{ type: Number, required: true }]],
  },
  {
    collection: "TimeDivisionMemory",
    timestamps: true,
  }
);

export const TimeDivisionMemoryModel = model<typeof TimeDivisionMemorySchema>(
  "TimeDivisionMemory",
  TimeDivisionMemorySchema
);
