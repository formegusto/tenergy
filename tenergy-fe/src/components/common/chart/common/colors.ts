import { IDangerIn, IPartIn } from "./types";

export const StrokePalette: IPartIn = {
  apt: "",
  household: "stroke-teal-200",
  trade: "stroke-teal-500",
  public: "stroke-cyan-400",
};

export const FillPalette: IPartIn = {
  apt: "",
  household: "fill-teal-200",
  trade: "fill-teal-500",
  public: "fill-cyan-400",
};

export const DangerPalette: IDangerIn = {
  danger: "stroke-rose-400",
  normal: "stroke-cyan-400",
  good: "stroke-teal-400",
};

export const PartToKR: IPartIn = {
  apt: "아파트",
  household: "세대",
  trade: "전력거래",
  public: "공동설비",
};
