export interface INavItem {
  title: string;
  isActive?: boolean;
  key?: string;
  value?: number;
}

export const NavItems: INavItem[] = [
  {
    title: "홈",
  },
  {
    title: "아파트",
    value: 6439541,
  },
  {
    title: "전력거래",
    value: 1750500,
  },
  {
    title: "공동설비",
    value: 2640560,
  },
];
