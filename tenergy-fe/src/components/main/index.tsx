import { DangerBarChart } from "@component/common";
import { DangerChartProps } from "@component/common/types";
import { authState } from "@store/atom";
import { h3, h5 } from "@styles/font";
import { useRecoilValue } from "recoil";
import APTCard from "./APTCard";
import PublicCard from "./PublicCard";
import TradeCard from "./TradeCard";
import { MainComponentProps } from "./types";

export function AdminMainComponent({
  total,
  datas,
}: DangerChartProps & MainComponentProps) {
  return (
    <div className="main-wrap flex flex-col">
      <div className="flex flex-row items-end gap-x-2.5 mb-3">
        <h3 className={h3 + [" text-slate-900"].join(" ")}>아파트 1</h3>
        <h5 className={h5 + [" text-slate-400"].join(" ")}>2019-01</h5>
      </div>
      <div className="w-12 h-1 bg-teal-200 mb-1" />
      <h5 className={h5 + [" text-slate-700", "mb-5"].join(" ")}>
        {total.toLocaleString("ko-KR")}kWh
      </h5>
      <DangerBarChart datas={datas} />
      <div className="datacard-group-wrap flex flex-row gap-x-16">
        <APTCard />
        <TradeCard />
        <PublicCard />
        {/* <DataCard type="apt" />
        <DataCard type="trade" />
        <DataCard type="public" /> */}
      </div>
    </div>
  );
}

export function HouseholdMainComponent() {
  const auth = useRecoilValue(authState);
  return (
    <div className="main-wrap flex flex-col">
      <div className="flex flex-row items-end gap-x-2.5 mb-3">
        <h3 className={h3 + [" text-slate-900"].join(" ")}>{auth!.name}</h3>
        <h5 className={h5 + [" text-slate-400"].join(" ")}>2019-01</h5>
      </div>
      <div className="w-12 h-1 bg-teal-200 mb-1" />
    </div>
  );
}
