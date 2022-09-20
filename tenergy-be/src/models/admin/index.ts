import { model, Schema } from "mongoose";
import { IAdmin } from "./types";

const AdminSchema = new Schema<IAdmin>(
  {},
  { timestamps: true, collection: "Admin" }
);

export const AdminModel = model<typeof AdminSchema>("Admin", AdminSchema);
