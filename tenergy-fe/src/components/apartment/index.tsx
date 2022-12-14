import { getAptAnalysis, getAptDetail } from "@api";
import { GlobalDataCard } from "@component/common";
import { IPart } from "@component/common/types";
import Analyzer from "@component/apartment/Analyzer";
import { useToken } from "@hook";
import { h3, tag1 } from "@styles/font";
import { useQuery } from "@tanstack/react-query";
import { PartToKR } from "@util";
import _ from "lodash";

const TITLESEQ: IPart[] = ["apt", "household", "trade", "public"];

export function ApartmentComponent() {
  const token = useToken();
  const { data: detailData } = useQuery(
    ["getAptDetail", token],
    () => getAptDetail(token!),
    {
      enabled: token !== null,
    }
  );
  const { data: analysisData } = useQuery(
    ["getAptAnalysis", token],
    () => getAptAnalysis(token!),
    {
      enabled: token !== null,
    }
  );

  return (
    <div className="apartment-wrap flex flex-col">
      <h3 className={h3 + [" text-slate-900"].join(" ")}>사용량 및 요금</h3>
      {detailData && (
        <div className="card-wrap flex flex-row gap-x-8 mt-6">
          {_.map(TITLESEQ, (titleSeq) => (
            <GlobalDataCard
              title={PartToKR[titleSeq]}
              titleValue={detailData[titleSeq].usage}
              titleUnit="kWh"
              keys={_.concat(detailData[titleSeq].keys, "")}
              values={_.concat(
                detailData[titleSeq].values,
                detailData[titleSeq].price
              )}
            />
          ))}
        </div>
      )}
      {analysisData && (
        <div className="analyzer">
          <h3 className={h3 + [" text-slate-900", "mt-12", "mb-6"].join(" ")}>
            사용량 분석
          </h3>
          <div className="analyzer-wrap flex flex-col">
            <p className={tag1 + [" mb-2", "text-slate-500"].join(" ")}>
              시간별
            </p>
            <Analyzer datas={analysisData.times} />
          </div>
          <div className="analyzer-warp">
            <p className={tag1 + [" mb-2", "text-slate-500"].join(" ")}>
              요일별
            </p>
            <Analyzer datas={analysisData.days} />
          </div>
        </div>
      )}
    </div>
  );
}
