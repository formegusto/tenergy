import { getTradeDetail } from "@api";
import { TradeDetailKey } from "@api/types";
import { GlobalDataCard } from "@component/common";
import { useToken } from "@hook";
import { h3 } from "@styles/font";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { TradeTitle } from "./types";

const TITLESEQ: TradeDetailKey[] = ["price", "usage"];
const UNITSEQ = ["원", "kWh"];
const KEYSSEQ: ("mean" | "min" | "max")[] = ["mean", "min", "max"];
const TITLE: TradeTitle = {
  price: "총 거래 금액",
  usage: "총 거래 사용량",
};
const SUBTITLE: { [key in "mean" | "min" | "max"]: string } = {
  mean: "평균",
  min: "최소",
  max: "최대",
};
const SUBTITLEUNIT: TradeTitle = {
  price: "가격",
  usage: "사용량",
};

export function TradeComponent() {
  const token = useToken();
  const { data: tradeDetail } = useQuery(
    ["getTradeDetail", token],
    () => getTradeDetail(token!),
    {
      enabled: token !== null,
    }
  );

  return (
    <div className="trade-wrap flex flex-col">
      <h3 className={[h3, "text-slate-900"].join(" ")}>거래 현황</h3>
      {tradeDetail && (
        <div className="card-wrap flex flex-row gap-x-8 mt-6">
          {_.map(TITLESEQ, (titleSeq, idx) => (
            <GlobalDataCard
              title={TITLE[titleSeq]}
              titleValue={Math.round(tradeDetail[titleSeq].value)}
              titleUnit={UNITSEQ[idx]}
              keys={_.map(KEYSSEQ, (key) =>
                [SUBTITLE[key], "거래", SUBTITLEUNIT[titleSeq]].join(" ")
              )}
              values={_.map(KEYSSEQ, (key) => tradeDetail[titleSeq][key])}
            />
          ))}
        </div>
      )}
    </div>
  );
}
