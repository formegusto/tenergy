import { useToken } from "@hook";
import { useQuery } from "@tanstack/react-query";
import { getTrade } from "@api";
import _ from "lodash";
import DataCard from "./DataCard";

const KEYSSEQ = ["count", "meanUnit", "meanPrice"];
const KEYSNAME = ["총 거래 횟수", "평균 거래 단위", "평균 거래 가격"];
const KEYSUNIT = ["회", "kWh", "원"];

function TradeCard() {
  const token = useToken();
  const { data } = useQuery(["getTrade", "dataCard"], () => getTrade(token!), {
    enabled: token !== null,
  });

  return data ? (
    <DataCard
      type="trade"
      titleValue={data.usage}
      titleUnit="kWh"
      keys={KEYSNAME}
      values={_.map(
        KEYSSEQ,
        (key, idx) =>
          Math.round(data[key]).toLocaleString("ko-KR") + ` ${KEYSUNIT[idx]}`
      )}
    />
  ) : (
    <></>
  );
}

export default TradeCard;
