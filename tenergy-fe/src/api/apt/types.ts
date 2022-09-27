import { IPart } from "@component/common/types";
import { DetailData } from "@store/types";

export interface ResGetChart {
  total: number;
  usages: number[];
}

export type ResGetAptDetail = {
  [key in IPart]: DetailData;
};
