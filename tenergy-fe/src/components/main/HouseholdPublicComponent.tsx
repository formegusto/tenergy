import { GlobalDataCard, NormalChart, SelectedPie } from "@component/common";
import { h3 } from "@styles/font";
import _ from "lodash";
import { HouseholdPublicComponentProps } from "./types";

function HouseholdPublicComponent({ data }: HouseholdPublicComponentProps) {
  const barColors = data
    ? _.map(data.contributions, (cont, idx) =>
        idx === data.my.group ? "stroke-cyan-400" : "stroke-slate-400"
      )
    : null;

  console.log(barColors);
  return (
    <>
      <h3 className={[h3, "text-slate-900", "mt-24"].join(" ")}>
        공동설비사용요금
      </h3>
      {data && (
        <div className="flex flex-row mt-12 gap-x-12 items-center">
          <div className="flex flex-row flex-1 gap-x-8">
            <div className="flex-1">
              <SelectedPie
                datas={data.contributions}
                selectedIdx={data.my.group}
              />
            </div>
            <div className="flex-1">
              <NormalChart
                datas={data.contributions}
                colors={barColors!}
                viewX={125}
                viewY={100}
                isFull
              />
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-y-3">
            <div className="flex flex-row gap-x-3 ">
              <GlobalDataCard
                title="기여도 그룹"
                titleValue={data.my.group + 1}
                titleUnit=""
              />
              <GlobalDataCard
                title="기여도"
                titleValue={Math.round(data.my.contribution * 100) / 100}
                titleUnit=""
              />
            </div>
            <div className="flex flex-row gap-x-3">
              <GlobalDataCard
                title="공동설비사용요금"
                titleValue={data.my.price}
                titleUnit=""
              />
              <GlobalDataCard
                className={data.my.err < 0 ? "text-teal-600" : "text-rose-600"}
                title="차이"
                titleValue={data.my.err}
                titleUnit=""
                isPrefix
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HouseholdPublicComponent;
