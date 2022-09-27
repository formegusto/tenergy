import React from "react";
import styled, { css } from "styled-components";
import { IPart } from "../common/types";
import { DoughnutControlProps, DoughnutStyleProps } from "./types";
import _ from "lodash";
import { StrokePalette } from "../common";

const STROKEWIDTH = 10;
const RADIUS = 50 - STROKEWIDTH;
const [CENTER_X, CENTER_Y] = _.fill(new Array(2), RADIUS + STROKEWIDTH / 2);
const DIAMETER = 2 * Math.PI * RADIUS;

function GetCircle(
  color: string,
  fillSpace: number,
  emptySpace: number,
  offset: number,
  label: string
): SVGCircleElement {
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );

  circle.setAttribute("cx", CENTER_X.toString());
  circle.setAttribute("cy", CENTER_Y.toString());
  circle.setAttribute("r", RADIUS.toString());
  circle.setAttribute("fill", "transparent");
  circle.classList.add(color);

  circle.setAttribute("stroke-width", STROKEWIDTH.toString());
  circle.setAttribute("stroke-dasharray", `${fillSpace} ${emptySpace}`);
  circle.setAttribute("stroke-dashoffset", -offset + "");
  circle.setAttribute("aria-label", label);

  return circle;
}

export function Doughnut({
  aptMean,
  ...styleProps
}: DoughnutStyleProps & DoughnutControlProps) {
  const refSVG = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    const seq: IPart[] = ["household", "trade", "public"];
    const datas = _.range(0, 3).map(
      (idx: number) => (aptMean as any)[seq[idx]]
    );

    while (refSVG.current?.hasChildNodes())
      refSVG.current.removeChild(refSVG.current.firstChild!);

    const colors = [
      StrokePalette["household"],
      StrokePalette["trade"],
      StrokePalette["public"],
    ];
    const acc = _.reduce(
      datas,
      (prev: number[], cur: number, idx: number) =>
        _.concat(prev, prev[idx] + cur),
      [0]
    );
    const total = _.sum(datas);
    _.forEach(datas, (d, idx) => {
      const ratio = d / total;
      const offset = (acc[idx] / total) * DIAMETER - DIAMETER / 4;
      const fillSpace = DIAMETER * ratio;
      const emptySpace = DIAMETER - fillSpace;
      refSVG.current!.appendChild(
        GetCircle(
          colors[idx]!,
          fillSpace,
          emptySpace,
          offset,
          `circle-value-${d}`
        )
      );
    });
  });
  return (
    <Wrap
      className="flex flex-row justify-center items-center relative"
      {...styleProps}
    >
      <svg
        width={styleProps.size ? styleProps.size : 100}
        height={styleProps.size ? styleProps.size : 100}
        ref={refSVG}
        viewBox={`0 0 ${RADIUS * 2 + STROKEWIDTH} ${RADIUS * 2 + STROKEWIDTH}`}
        xmlns="https://www.w3.org/2000/svg"
      />
      <Title className="text-slate-50">368</Title>
    </Wrap>
  );
}

const Wrap = styled.div<DoughnutStyleProps>`
  ${({ size }) =>
    size
      ? css`
          width: ${size}px;
          height: ${size}px;
        `
      : css`
          width: 100px;
          height: 100px;
        `}
`;

const Title = styled.span`
  display: inline-block;
  position: absolute;

  font-weight: 700;
  font-size: 28px;
  line-height: 35px;
  letter-spacing: 0.1em;
`;
