import { p1, tag1 } from "@styles/font";
import styled from "styled-components";
import { StackBarControlProps } from "../../sidebar/simpleChart/types";
import { PartToKR, StrokePalette } from "../common";
import { IPart } from "../common/types";
import { StackBarViewProps } from "./types";

const SEQ: IPart[] = ["household", "trading", "public"];

function StackBarView({ pkey, value }: StackBarViewProps) {
  return (
    <div className="flex-1">
      <div className="flex flex-col items-center">
        <p className={"mb-1 " + p1 + " text-slate-50"}>{value}</p>
        <p className={"mb-1 " + tag1 + " text-slate-400"}>{PartToKR[pkey]}</p>
      </div>
      <svg xmlns="https://www.w3.org/2000/svg" width="100%" height={6}>
        <line
          x1={0}
          y1={3}
          x2={83.33}
          y2={3}
          fill="none"
          strokeWidth={6}
          className={`${StrokePalette[pkey]}`}
        />
      </svg>
    </div>
  );
}
export function StackBar({ aptMean }: StackBarControlProps) {
  return (
    <Wrap>
      {SEQ.map((key, idx) => (
        <StackBarView
          key={`stackbar-view-${idx}`}
          pkey={key}
          value={aptMean[key]}
        />
      ))}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: row;

  width: 250px;
  height: 80px;
`;
