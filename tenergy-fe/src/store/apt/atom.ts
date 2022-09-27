import { atom } from "recoil";
import { APT } from "./types";

export const aptState = atom<APT | null>({ key: "aptState", default: null });
