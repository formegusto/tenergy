import { atom } from "recoil";
import { IAuth } from "./types";

export const tokenState = atom<string | null>({
  key: "tokenState",
  default: null,
});

export const authState = atom<IAuth | null>({
  key: "authState",
  default: null,
});
