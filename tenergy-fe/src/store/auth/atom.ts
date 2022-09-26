import { atom } from "recoil";

export const tokenState = atom<string | null>({
  key: "tokenState",
  default: null,
});

export const authState = atom<any | null>({
  key: "authState",
  default: null,
});
