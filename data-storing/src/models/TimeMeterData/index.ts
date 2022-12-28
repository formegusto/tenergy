import { model, Schema } from "mongoose";
import { ITimeMeterData } from "./types";

const TimeMeterDataSchema = new Schema<ITimeMeterData>(
  {
    time: { type: Date, required: true },
    data: [{ type: Schema.Types.Mixed, required: true }],
  },
  {
    collection: "TimeMeterData",
    versionKey: false,
  }
);

export const TimeMeterDataModel = model<typeof TimeMeterDataSchema>(
  "TimeMeterData",
  TimeMeterDataSchema
);
