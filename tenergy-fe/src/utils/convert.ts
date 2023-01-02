import { IPartIn } from "@component/common/types";
import { FileStatus } from "@store/types";

export const PartToKR: IPartIn = {
  apt: "아파트",
  household: "세대",
  trade: "전력거래",
  public: "공동설비",
};

export const DayIdxToKR = ["일", "월", "화", "수", "목", "금", "토"];

export const FileStatusToKR: { [key in FileStatus]: string } = {
  ACTIVE: "활성",
  PENDING: "비활성",
  READY: "활성 준비",
  STEP1: "가격 분배 진행",
  STEP2: "전력 거래 진행",
};
