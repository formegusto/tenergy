import { getApt } from "@api";
import { Logo } from "@assets";
import { Doughnut, StackBar } from "@component/common";
import { IPart } from "@component/common/types";
import { useToken } from "@hook";
import { aptState, authState } from "@store/atom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import Nav from "../nav";
import { SimpleChartWrap } from "./styles";
import _ from "lodash";

const NAVSEQ: IPart[] = ["apt", "trade", "public"];

function SimpleChart() {
  const token = useToken();
  const auth = useRecoilValue(authState);
  const [apt, setApt] = useRecoilState(aptState);
  useQuery(["getAPT", token], () => getApt(token!), {
    enabled: token !== null && auth!.role === "ADMIN" && apt === null,
    onSuccess: (data) => {
      setApt(data);
    },
  });

  return (
    <>
      <img className="logo" src={Logo.LogoX3} alt="tenergy-logo" />
      {apt ? (
        <>
          <Nav price={_.map(NAVSEQ, (seq) => apt.price[seq])} />
          <SimpleChartWrap className="simple-char-wrap flex flex-1 flex-col items-center mt-12">
            <Doughnut size={150} aptMean={apt.usage} />
            <StackBar aptMean={apt.usage} />
          </SimpleChartWrap>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default SimpleChart;
