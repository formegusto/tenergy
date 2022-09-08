export interface TradeResult {
  name: string;
  quantity: number;
  price: number;
}

export interface CompareHouseholdItem {
  kwh: number;
  price: number;
}

export interface CompareHousehold {
  name: string;
  before: CompareHouseholdItem;
  after: CompareHouseholdItem;
  err: number;
}
