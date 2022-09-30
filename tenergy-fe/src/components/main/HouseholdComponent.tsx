import { DangerBarChart, GlobalDataCard, Spinner } from "@component/common";
import { h5 } from "@styles/font";
import { HouseholdComponentProps } from "./types";
import { MdOutlineRemove, MdOutlineAdd, MdDragHandle } from "react-icons/md";

export function HouseholdComponent({ data }: HouseholdComponentProps) {
  return data ? (
    <div className="flex flex-col">
      <h5 className={[h5, "text-slate-700"].join(" ")}>{data?.usage}kWh</h5>
      <DangerBarChart datas={data.chart} />
      <div className="card-wrap flex flex-row gap-x-8 mt-6 items-center">
        <GlobalDataCard
          title="전기요금"
          titleUnit=""
          titleValue={data.price.elecBill}
        />
        <MdOutlineAdd size={32} className="text-slate-900" />
        <GlobalDataCard
          title="공동설비"
          titleUnit=""
          titleValue={data.price.public}
        />
        <MdOutlineRemove size={32} className="text-slate-900" />
        <GlobalDataCard
          title="전력거래"
          titleUnit=""
          titleValue={Math.abs(data.price.trade)}
        />
        <MdDragHandle size={32} className="text-slate-900" />
        <GlobalDataCard
          title="최종청구금액"
          titleUnit=""
          titleValue={Math.abs(
            data.price.elecBill + data.price.public + data.price.trade
          )}
        />
      </div>
    </div>
  ) : (
    <Spinner />
  );
}
