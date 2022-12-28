import { Schema } from "mongoose";
import { HouseholdModel } from ".";

export interface IHousehold {
  _id?: Schema.Types.ObjectId;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Household implements IHousehold {
  _id!: Schema.Types.ObjectId;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(model: IHousehold) {
    Object.assign(this, model);
  }

  static async save(name: string) {
    await HouseholdModel.create({ name });
  }
}
