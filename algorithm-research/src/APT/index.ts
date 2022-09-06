import { HouseholdModel } from "../models";
import { Household } from "../models/types";
import _ from "lodash";

class APT {
  households: Household[];
  publicPercentage: number;

  constructor(households: Household[], publicPercentage: number) {
    this.households = households;
    this.publicPercentage = publicPercentage;
  }

  static async init(publicPercentage: number) {
    const householdDocs = await HouseholdModel.find({}, { _id: 0, name: 1 });
    const householdNames = _.map(householdDocs, ({ name }) => name);

    const households = await Promise.all(
      _.map(householdNames, (name) => Household.init(name))
    );

    return new APT(households, publicPercentage);
  }
}

export default APT;
