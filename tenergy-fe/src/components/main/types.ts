import { IPart } from "@component/common/types";

export interface DataCardProps {
  type: IPart;
  titleValue: number;
  titleUnit: string;
  keys: string[];
  values: string[];
}

export interface MainComponentProps {
  total: number;
}
