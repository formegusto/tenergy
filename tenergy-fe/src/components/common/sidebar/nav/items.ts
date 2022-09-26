export interface INavItem {
  title: string;
  to: string;
  key?: string;
  value?: number;
}

export const NavItems: INavItem[] = [
  {
    title: "홈",
    to: "/",
  },
  {
    title: "아파트",
    to: "/apartment",
    value: 6439541,
  },
  {
    title: "전력거래",
    to: "/trading",
    value: 1750500,
  },
  {
    title: "공동설비",
    to: "/public",
    value: 2640560,
  },
];
