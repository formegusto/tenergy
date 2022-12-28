import { Schema } from "mongoose";

export interface IHousehold {
  _id?: Schema.Types.ObjectId;
  name: string;
  createdAt?: Date;
}

export class Household implements IHousehold {
  _id!: Schema.Types.ObjectId;
  name!: string;
  createdAt!: Date;

  constructor(model: IHousehold) {
    Object.assign(this, model);
  }
}
