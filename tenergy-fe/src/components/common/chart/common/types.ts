export type IPart = "household" | "apt" | "public" | "trading";
export type IPartIn = {
  [key in IPart]: any;
};
