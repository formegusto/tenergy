import { UnauthError } from "@common";
import { AdminModel } from "@models/admin";
import { HouseholdModel } from "@models/household";
import { Schema } from "mongoose";

export type AuthRole = "HOUSEHOLD" | "ADMIN";

export interface IAuth {
  _id?: Schema.Types.ObjectId;
  name: string;
  role: AuthRole;
}

export class Auth implements IAuth {
  _id?: Schema.Types.ObjectId;
  name: string;
  role: AuthRole;

  constructor(name: string, role: AuthRole, _id?: Schema.Types.ObjectId) {
    this._id = _id;
    this.name = name;
    this.role = role;
  }

  static async find(name: string) {
    try {
      const admin = await AdminModel.findById(name);
      if (admin) return new Auth(admin.id, "ADMIN");
    } catch (err) {
      const household = await HouseholdModel.findOne({ name });
      if (household) return new Auth(household.name, "HOUSEHOLD", household.id);
    }
    throw UnauthError;
  }
}
