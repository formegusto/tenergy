import {
  LineChart,
  NormalChart,
  TableBody,
  TableCol,
  TableHead,
  TableRow,
  TableWrap,
} from "@component/common";
import { tag1 } from "@styles/font";
import { PublicDistributeProps } from "./types";

const strokeColors = [
  "stroke-cyan-200",
  "stroke-cyan-300",
  "stroke-cyan-400",
  "stroke-cyan-500",
  "stroke-cyan-600",
  "stroke-cyan-700",
  "stroke-cyan-800",
  "stroke-cyan-900",
];

function PublicDistribute({ data }: PublicDistributeProps) {
  return (
    <div className="public-distribute-wrap flex flex-col">
      <div className="visualization-wrap flex flex-row gap-x-12">
        <div className="flex-1 flex flex-col ">
          <p className={[tag1, "text-slate-500", "mb-12"].join(" ")}>분포도</p>
          <NormalChart datas={data.groupCount} colors={strokeColors} />
        </div>
        <div className="flex-1 flex flex-col">
          <p className={[tag1, "text-slate-500", "mb-12"].join(" ")}>
            그룹별 평균 사용패턴
          </p>
          <LineChart datas={data.groupPattern} colors={strokeColors} />
        </div>
      </div>
      <TableWrap className="mt-6 mb-12">
        <TableHead>
          <TableRow className={[tag1, "text-slate-400"].join(" ")}>
            <TableCol width={120}>그룹 번호</TableCol>
            <TableCol width={120}>세대 수</TableCol>
            <TableCol width={120}>기여도</TableCol>
            <TableCol>평균 사용량</TableCol>
            <TableCol>요금</TableCol>
            <TableCol>차이</TableCol>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.table.map(
            ({ groupNo, count, contribution, meanUsage, price, err }) => (
              <TableRow
                key={`distribute-group-${groupNo}`}
                className={[tag1, "text-slate-600"].join(" ")}
              >
                <TableCol width={120}>{groupNo}</TableCol>
                <TableCol width={120}>{count}</TableCol>
                <TableCol width={120}>
                  {Math.round(contribution * 100) / 100}
                </TableCol>
                <TableCol>{meanUsage.toLocaleString("ko-KR")} kWh</TableCol>
                <TableCol>{price.toLocaleString("ko-KR")} 원</TableCol>
                <TableCol
                  className={err > 0 ? "text-rose-600" : "text-teal-600"}
                >
                  {err > 0 && "+"}
                  {err.toLocaleString("ko-KR")} 원
                </TableCol>
              </TableRow>
            )
          )}
        </TableBody>
      </TableWrap>
    </div>
  );
}

export default PublicDistribute;
