import { NormalChart } from "@component/common";
import { h5, tag1 } from "@styles/font";
import { data } from "autoprefixer";
import _ from "lodash";
import { AnalyzerProps } from "./types";

const strokeColors = [
  "stroke-rose-900",
  "stroke-rose-800",
  "stroke-rose-700",
  "stroke-rose-600",
  "stroke-rose-500",
  "stroke-rose-400",
  "stroke-rose-300",
  "stroke-rose-200",
  "stroke-rose-100",
  "stroke-rose-50",
];
const fontColors = [
  "text-slate-50",
  "text-slate-100",
  "text-slate-200",
  "text-slate-300",
  "text-slate-400",
  "text-slate-500",
  "text-slate-600",
  "text-slate-700",
  "text-slate-800",
  "text-slate-900",
];
const bgColors = [
  "bg-rose-900",
  "bg-rose-800",
  "bg-rose-700",
  "bg-rose-600",
  "bg-rose-500",
  "bg-rose-400",
  "bg-rose-300",
  "bg-rose-200",
  "bg-rose-100",
  "bg-rose-50",
];

function Analyzer({ datas }: AnalyzerProps) {
  const sortedDatas = _.map(
    _.reverse(_.sortBy(datas, ({ value }) => value)),
    (data, idx) => ({
      ...data,
      stroke: strokeColors[idx],
      bg: bgColors[idx],
      font: fontColors[idx],
    })
  );
  const colorDatas = _.map(datas, ({ name }) => _.find(sortedDatas, { name }));

  return (
    <div className="analyzer-block flex flex-row gap-x-16 py-6 items-center">
      <div className="chart-wrap flex-1">
        <NormalChart
          datas={_.map(datas, ({ value }) => value)}
          colors={_.map(colorDatas, ({ stroke }: any) => stroke)}
        />
      </div>
      <div className="card-wrap flex flex-col flex-1 gap-y-8">
        {_.chunk(sortedDatas, 4).map((chunked) => (
          <div
            className="card-row-group flex flex-row flex-1 gap-x-2"
            key={`analyzer-${Math.random()}`}
          >
            {_.map(chunked, ({ name, value, font, bg }) => (
              <div
                className={`simple-card flex-1 rounded-xl box-border p-3 ${font} ${bg}`}
              >
                <p className={["title", tag1].join(" ")}>{name}</p>
                <p className={["value", h5, "text-center", "p-3"].join(" ")}>
                  {Math.round(value).toLocaleString("ko-KR")}kWh
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Analyzer;
