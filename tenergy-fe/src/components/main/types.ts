import {
  FeedbackType,
  ResGetHouseholdInformation,
  ResGetHouseholdPublic,
} from "@api/household/types";
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

export interface HouseholdComponentProps {
  data?: ResGetHouseholdInformation;
}

export interface HouseholdPublicComponentProps {
  data?: ResGetHouseholdPublic;
}

export interface FeedbackProps {
  type: FeedbackType;
}
