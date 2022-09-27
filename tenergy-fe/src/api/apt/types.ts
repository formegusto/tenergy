import { IPart } from "@component/common/types";
import { DetailData, NameLabelData } from "@store/types";

export interface ResGetChart {
  total: number;
  usages: number[];
}

export type ResGetAptDetail = {
  [key in IPart]: DetailData;
};

export type ResGetAnalysis = {
  times: NameLabelData[];
  days: NameLabelData[];
};
