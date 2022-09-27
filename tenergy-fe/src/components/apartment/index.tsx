import { GlobalDataCard } from "@component/common";
import Analyzer from "@container/apartment/Analyzer";
import { h3, tag1 } from "@styles/font";

export function ApartmentComponent() {
  return (
    <div className="apartment-wrap flex flex-col">
      <h3 className={h3 + [" text-slate-900"].join(" ")}>사용량 및 요금</h3>
      <div className="card-wrap flex flex-row gap-x-8 mt-6">
        <GlobalDataCard />
        <GlobalDataCard />
        <GlobalDataCard />
        <GlobalDataCard />
      </div>
      <div className="analyzer">
        <h3 className={h3 + [" text-slate-900", "mt-12", "mb-6"].join(" ")}>
          사용량 분석
        </h3>
        <div className="analyzer-wrap flex flex-col">
          <p className={tag1 + [" mb-2", "text-slate-500"].join(" ")}>시간별</p>
          <Analyzer />
        </div>
        <div className="analyzer-warp">
          <p className={tag1 + [" mb-2", "text-slate-500"].join(" ")}>요일별</p>
          <Analyzer />
        </div>
      </div>
    </div>
  );
}
