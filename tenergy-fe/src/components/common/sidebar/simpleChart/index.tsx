import { Logo } from "@assets";
import { Doughnut, StackBar } from "@component/common";
import Nav from "../nav";
import { SimpleChartWrap } from "./styles";

function SimpleChart() {
  return (
    <>
      <img className="logo" src={Logo.LogoX3} alt="tenergy-logo" />
      <Nav />
      <SimpleChartWrap className="simple-char-wrap flex flex-1 flex-col items-center mt-12">
        <Doughnut
          size={150}
          aptMean={{
            apt: 368,
            household: 200,
            trade: 68,
            public: 100,
          }}
        />
        <StackBar
          aptMean={{
            apt: 368,
            household: 200,
            trade: 68,
            public: 100,
          }}
        />
      </SimpleChartWrap>
    </>
  );
}

export default SimpleChart;
