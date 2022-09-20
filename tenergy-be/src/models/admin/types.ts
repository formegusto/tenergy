import { Schema } from "mongoose";

export interface IAdmin {
  _id?: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
