import { Schema } from "mongoose";

export interface IHousehold {
  _id?: Schema.Types.ObjectId;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
