import { getCompare } from "@api";
import { Compare } from "@api/types";
import {
  TableBody,
  TableCol,
  TableHead,
  TableRow,
  TableWrap,
} from "@component/common";
import { useToken } from "@hook";
import { tag1 } from "@styles/font";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import React from "react";
import TradeRoleView from "./TradeRoleView";

function CompareTable() {
  const token = useToken();
  const [datas, setDatas] = React.useState<Compare[] | null>();
  const { data: compareData } = useQuery(
    ["getCompare", token],
    () => getCompare(token!),
    {
      enabled: token !== null,
      onSuccess: (data) => {
        setDatas(data);
      },
    }
  );

  const nameSort = React.useCallback(() => {
    setDatas(_.sortBy(datas, ({ name }) => name));
  }, [datas]);

  const usageSort = React.useCallback(() => {
    setDatas(_.reverse(_.sortBy(datas, ({ err }) => Math.abs(err.kwh))));
  }, [datas]);

  const benefitSort = React.useCallback(() => {
    setDatas(_.sortBy(datas, ({ err }) => err.bill + err.public));
  }, [datas]);

  return compareData ? (
    <TableWrap className="mt-12 mb-12">
      <TableHead>
        <TableRow className={[tag1, "text-slate-400"].join(" ")}>
          <TableCol width={90}>역할</TableCol>
          <TableCol width={182} isCursor onClick={nameSort}>
            가구명
          </TableCol>
          <TableCol width={132} isCursor onClick={usageSort}>
            거래 사용량
          </TableCol>
          <TableCol>거래 전 가격</TableCol>
          <TableCol>거래 후 가격</TableCol>
          <TableCol isCursor onClick={benefitSort}>
            가격 변화
          </TableCol>
        </TableRow>
      </TableHead>
      <TableBody>
        {_.map(datas, ({ role, _id, name, before, after, err }) => (
          <TableRow key={_id} className={[tag1, "text-slate-600"].join(" ")}>
            <TableCol width={90}>
              <TradeRoleView role={role} />
            </TableCol>
            <TableCol width={182}>{name}</TableCol>
            <TableCol width={132}>{Math.abs(err.kwh)} kWh</TableCol>
            <TableCol>
              {Math.round(before.bill + before.public).toLocaleString("ko-KR")}{" "}
              원
            </TableCol>
            <TableCol>
              {Math.round(after.bill + after.public).toLocaleString("ko-KR")} 원
            </TableCol>
            <TableCol
              className={
                Math.round(err.bill + err.public) > 0
                  ? "text-rose-600"
                  : "text-teal-600"
              }
            >
              {err.bill + err.public > 0 && "+"}
              {Math.round(err.bill + err.public).toLocaleString("ko-KR")} 원
            </TableCol>
          </TableRow>
        ))}
      </TableBody>
    </TableWrap>
  ) : (
    <></>
  );
}

export default CompareTable;
