import { getPublic } from "@api";
import { useToken } from "@hook";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import DataCard from "./DataCard";

function PublicCard() {
  const token = useToken();
  const { data } = useQuery(
    ["getPublic", "dataCard"],
    () => getPublic(token!),
    {
      enabled: token !== null,
    }
  );

  return data ? (
    <DataCard
      type="public"
      titleValue={data.privatePrice}
      titleUnit={"원"}
      keys={_.map(
        _.take(data.distributePrices, 3),
        (d, idx) => `Group ${idx + 1}`
      )}
      values={_.map(
        _.take(data.distributePrices, 3),
        (d, idx) => `${d.toLocaleString("ko-KR")} 원`
      )}
    />
  ) : (
    <></>
  );
}

export default PublicCard;
