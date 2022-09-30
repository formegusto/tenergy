export interface INavItem {
  title: string;
  to?: string;
  key?: string;
  value?: number;
  isHousehold?: boolean;
}

export const NavItems: INavItem[] = [
  {
    title: "홈",
    to: "/",
  },
  {
    title: "아파트",
    to: "/apartment",
  },
  {
    title: "전력거래",
    to: "/trading",
  },
  {
    title: "공동설비",
    to: "/public",
  },
];

export const HouseholdNavItems: INavItem[] = [
  {
    title: "전기요금",
    isHousehold: true,
  },
  {
    title: "공동설비",
    isHousehold: true,
  },
  {
    title: "전력거래",
    isHousehold: true,
  },
  {
    title: "최종청구금액",
    isHousehold: true,
  },
];
