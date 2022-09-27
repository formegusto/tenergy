export type IPart = "household" | "apt" | "public" | "trade";
export type IPartIn = {
  [key in IPart]: any;
};

export type IDanger = "danger" | "normal" | "good";
export type IDangerIn = {
  [key in IDanger]: any;
};
