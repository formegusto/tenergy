import { Doughnut, StackBar } from "@component/common";
import { SimpleChartWrap } from "./styles";

function SimpleChart() {
  return (
    <SimpleChartWrap className="simple-char-wrap flex flex-1 flex-col items-center mt-12">
      <Doughnut
        size={150}
        aptMean={{
          apt: 368,
          household: 200,
          trading: 68,
          public: 100,
        }}
      />
      <StackBar
        aptMean={{
          apt: 368,
          household: 200,
          trading: 68,
          public: 100,
        }}
      />
    </SimpleChartWrap>
  );
}

export default SimpleChart;
