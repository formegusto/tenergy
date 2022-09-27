import { NormalChart } from "@component/common";
import { h5, tag2 } from "@styles/font";
import _ from "lodash";

const datas = new Array(8).fill(0).map(() => Math.random() * 100 + 1);
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

const sortedDatas = _.sortBy(datas);
const sortedIdxesStrokeColors = _.map(
  datas,
  (data) => strokeColors[datas.length - _.sortedIndex(sortedDatas, data) - 1]
);

function Analyzer() {
  return (
    <div className="analyzer-block flex flex-row gap-x-16 py-6 items-center">
      <div className="chart-wrap flex-1">
        <NormalChart datas={datas} colors={sortedIdxesStrokeColors} />
      </div>
      <div className="card-wrap flex flex-col flex-1 gap-y-8">
        {_.chunk(_.reverse(sortedDatas), 4).map((chunked, rowIdx) => (
          <div className="card-row-group flex flex-row flex-1 gap-x-2">
            {_.map(chunked, (chunk, colIdx) => (
              <div
                className={`simple-card flex-1 rounded-xl box-border p-3 ${
                  fontColors[4 * rowIdx + colIdx]
                } ${bgColors[4 * rowIdx + colIdx]}`}
              >
                <p className={["title", tag2].join(" ")}>월요일</p>
                <p className={["value", h5, "text-center", "p-3"].join(" ")}>
                  {Math.round(chunk)}kWh
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
