export interface ResGetPublic {
  privatePrice: number;
  distributePrices: number[];
}

export interface ResGetPublicPrice {
  apartment: number;
  householdPart: number;
  householdCount: number;
  tradePart: number;
  publicPart: number;
  priPublicPrice: number;
}

export interface ResGetPublicDetail {
  groupCount: number[];
  groupPattern: Array<number[]>;
  table: Table[];
}

export interface Table {
  groupNo: number;
  count: number;
  contribution: number;
  meanUsage: number;
  price: number;
  err: number;
}
