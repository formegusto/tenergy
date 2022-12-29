export interface TradeResult {
  name: string;
  quantity: number;
  price: number;
}

export interface CompareHouseholdItem {
  kwh: number;
  bill: number;
  public: number;
}

export interface CompareHousehold {
  name: string;
  before: CompareHouseholdItem;
  after: CompareHouseholdItem;
  err: CompareHouseholdItem;
  role: "SELLER" | "BUYER" | "NONE";
}
