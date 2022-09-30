import { atom } from "recoil";
import { APT, IHousehold } from "./types";

export const aptState = atom<APT | null>({ key: "aptState", default: null });

export const householdState = atom<IHousehold | null>({
  key: "householdState",
  default: null,
});
