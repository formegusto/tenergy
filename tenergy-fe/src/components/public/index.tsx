import { getPublicDetail, getPublicPrice } from "@api";
import { GlobalDataCard } from "@component/common";
import { useToken } from "@hook";
import { h3 } from "@styles/font";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineRemove, MdOutlineAdd, MdDragHandle } from "react-icons/md";
import PublicDistribute from "./PublicDistribute";

export function PublicComponent() {
  const token = useToken();
  const { data } = useQuery(
    ["getPublicPrice", token],
    () => getPublicPrice(token!),
    {
      enabled: token !== null,
    }
  );
  const { data: detailDatas } = useQuery(
    ["getPublicDetail", token],
    () => getPublicDetail(token!),
    {
      enabled: token !== null,
    }
  );

  return (
    <div className="public-wrap flex flex-col">
      <h3 className={[h3, "text-slate-900", "mb-3"].join(" ")}>
        공동설비사용요금
      </h3>
      {data && (
        <div className="card-wrap flex flex-row gap-x-8 mt-6 items-center">
          <GlobalDataCard
            title="아파트"
            titleValue={data.apartment}
            titleUnit=""
          />
          <MdOutlineRemove size={32} className="text-slate-900" />
          <GlobalDataCard
            title="세대"
            titleValue={data.householdPart}
            titleUnit=""
          />
          <MdOutlineAdd size={32} className="text-slate-900" />
          <GlobalDataCard
            title="전력거래"
            titleValue={data.tradePart}
            titleUnit=""
          />
          <MdDragHandle size={32} className="text-slate-900" />
          <GlobalDataCard
            title="공동설비"
            titleValue={data.publicPart}
            titleUnit=""
            keys={["가구 수", ""]}
            values={[data.householdCount, data.priPublicPrice]}
          />
        </div>
      )}
      <h3 className={[h3, "text-slate-900", "mb-6", "mt-12"].join(" ")}>
        기여도 현황
      </h3>
      {detailDatas && <PublicDistribute data={detailDatas} />}
    </div>
  );
}
