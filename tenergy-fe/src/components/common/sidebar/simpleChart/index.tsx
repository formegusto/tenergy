import { getApt } from "@api";
import { Logo } from "@assets";
import { Doughnut, StackBar } from "@component/common";
import { IPart } from "@component/common/types";
import { useToken } from "@hook";
import { aptState, authState, householdState } from "@store/atom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import Nav from "../nav";
import { SimpleChartWrap } from "./styles";
import _ from "lodash";
import { IHouseholdPart } from "@store/types";
import { useNavigate } from "react-router-dom";

const NAVSEQ: IPart[] = ["apt", "trade", "public"];
const NAVHOUSEHOLDSEQ: IHouseholdPart[] = [
  "elecBill",
  "public",
  "trade",
  "bill",
];

function SimpleChart() {
  const navigate = useNavigate();

  const token = useToken();
  const auth = useRecoilValue(authState);
  const [apt, setApt] = useRecoilState(aptState);
  useQuery(["getAPT", token], () => getApt(token!), {
    enabled: token !== null && auth!.role === "ADMIN" && apt === null,
    onSuccess: (data) => {
      setApt(data);
    },
  });

  const household = useRecoilValue(householdState);

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
          <button
            className="bg-transparent text-white font-semibold border py-2 px-4 rounded w-4/5 mb-8 hover:text-black hover:bg-white"
            onClick={() => navigate("/manager")}>
            Manager
          </button>
        </>
      ) : household ? (
        <>
          <Nav
            price={_.map(NAVHOUSEHOLDSEQ, (seq) => Math.abs(household[seq]))}
            isHousehold
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default SimpleChart;
