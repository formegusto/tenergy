import { getApt } from "@api";
import { IPart } from "@component/common/types";
import { useToken } from "@hook";
import { useQuery } from "@tanstack/react-query";
import { PartToKR } from "@util";
import DataCard from "./DataCard";

const KEYSSEQ: IPart[] = ["household", "public", "trade"];

function APTCard() {
  const token = useToken();
  const { data } = useQuery(["getAPT", "dataCard"], () => getApt(token!), {
    enabled: token !== null,
  });

  return data ? (
    <DataCard
      type="apt"
      titleValue={data.price.apt}
      titleUnit="원"
      keys={KEYSSEQ.map((key) => PartToKR[key])}
      values={KEYSSEQ.map(
        (key) => data.price[key].toLocaleString("ko-KR") + " 원"
      )}
    />
  ) : (
    <></>
  );
}

export default APTCard;
