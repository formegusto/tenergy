import { p3, tag1 } from "@styles/font";
import { FeedbackProps } from "./types";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "@hook";
import { getHouseholdFeedback } from "@api";
import { GlobalDataCard, LineChart } from "@component/common";
import { DayIdxToKR } from "@util";

type FeedbackLevel = "danger" | "warning" | "good";
type LevelColor = {
  [key in FeedbackLevel]: string;
};
const levelColor: LevelColor = {
  danger: "stroke-rose-700",
  warning: "stroke-rose-300",
  good: "stroke-teal-400",
};

function Feedback({ type }: FeedbackProps) {
  const token = useToken();
  const { data } = useQuery(
    ["getFeedback", type, token],
    () => getHouseholdFeedback(token!, type),
    {
      enabled: token !== null,
    }
  );

  return (
    <div className="flex-1 flex flex-col">
      {data && (
        <>
          <p className={[tag1, "mb-4", "text-slate-500"].join(" ")}>
            {type === "time" ? "시간" : "요일"}
          </p>
          <div className="flex flex-row flex-wrap gap-x-8 gap-y-10 overflow-visible">
            {_.map(_.toPairs(data.patterns), ([key, value]) => (
              <div className="w-40 overflow-visible">
                <LineChart
                  datas={_.concat([value.my], [value.centroids])}
                  colors={
                    data.dangerProposal.includes(key)
                      ? _.fill(Array(2), levelColor["danger"])
                      : data.warningProposal.includes(key)
                      ? _.fill(Array(2), levelColor["warning"])
                      : _.fill(Array(2), levelColor["good"])
                  }
                  viewX={160}
                  viewY={80}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col mt-12">
            <p className={[p3, "text-rose-700"].join(" ")}>
              <b>적극적인 전기절약 실천이 필요해요.</b>
            </p>
            <div className="flex flex-row p-2.5 gap-x-2.5 box-border h-16">
              {_.map(data.dangerProposal, (danger) => (
                <div
                  key={`danger-feedback-${danger}`}
                  className="p-2.5 shadow rounded-lg flex items-center jusitfy-center"
                >
                  <p className={[tag1, "text-slate-900"].join(" ")}>
                    <b>
                      {type === "time"
                        ? `${parseInt(danger)}시~${
                            parseInt(danger) + (data.size - 1)
                          }시`
                        : `${DayIdxToKR[parseInt(danger)]}`}
                    </b>
                  </p>
                </div>
              ))}
            </div>
            <p className={[p3, "text-rose-300", "mt-4"].join(" ")}>
              <b>전기절약을 통해 전기요금을 더욱 낮출 수 있습니다.</b>
            </p>
            <div className="flex flex-row p-2.5 gap-x-2.5  box-border h-16">
              {_.map(data.warningProposal, (warning) => (
                <div
                  key={`warning-feedback-${warning}`}
                  className="p-2.5 shadow rounded-lg flex items-center jusitfy-center"
                >
                  <p className={[tag1, "text-slate-900"].join(" ")}>
                    <b>
                      {type === "time"
                        ? `${parseInt(warning)}시~${
                            parseInt(warning) + (data.size - 1)
                          }시`
                        : `${DayIdxToKR[parseInt(warning)]}`}
                    </b>
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-y-3 mt-6">
            <div className="flex flex-row gap-x-3 ">
              <GlobalDataCard
                title="현재 전기사용량"
                titleValue={data.usage.before}
                titleUnit=""
              />
              <GlobalDataCard
                title="피드백 실천 기대사용량"
                titleValue={data.usage.after}
                titleUnit=""
              />
            </div>
            <div className="flex flex-row gap-x-3 ">
              <GlobalDataCard
                title="현재 전기요금"
                titleValue={data.price.before}
                titleUnit=""
              />
              <GlobalDataCard
                title="피드백 실천 기대요금"
                titleValue={data.price.after}
                titleUnit=""
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Feedback;
