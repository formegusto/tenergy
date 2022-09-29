import React from "react";
import { DangerChartSVG, NormalChartSVG } from "./styles";
import _ from "lodash";
import { DangerPalette } from "../common";
import {
  DangerChartProps,
  NormalChartProps,
  NormalChartStyleProps,
} from "./types";

const [VIEW_X, VIEW_Y] = [350, 100];
const MAX_Y = 100;
// const TEXT_MARGIN = 10;
// const TEXT_SIZE = 7.47;
const MARGIN_RATIO = 0.4;

export function NormalChart({
  datas,
  colors,
  viewX,
  viewY,
  ...styleProps
}: NormalChartProps & NormalChartStyleProps) {
  const refSVG = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    if (refSVG.current) {
      while (refSVG.current?.hasChildNodes())
        refSVG.current.removeChild(refSVG.current.firstChild!);

      const margin = (viewX / datas.length) * MARGIN_RATIO;
      const strokeWidth = (viewX - margin * (datas.length - 1)) / datas.length;
      const startX = strokeWidth / 2;

      const x: Array<number> = [startX];
      for (let i = 1; i < datas.length; i++)
        x.push(x[i - 1] + margin + strokeWidth);

      const MAX = Math.max.apply(null, datas);
      const y: Array<number> = [];
      for (let i = 0; i < datas.length; i++) {
        const norm = (datas[i] - 0) / (MAX - 0);
        y.push(MAX_Y - MAX_Y * norm);
      }
      console.log(y);

      for (let i = 0; i < datas.length; i++) {
        const path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        const d = ["M", x[i], MAX_Y, "L", x[i], y[i]];
        path.setAttribute("d", d.join(" "));
        path.classList.add(colors[i]);

        path.setAttribute("stroke", "#333");
        path.setAttribute("stroke-width", strokeWidth.toString());

        if ((i + 1) % 5 === 0) {
          //   const text = document.createElementNS(
          //     "http://www.w3.org/2000/svg",
          //     "text"
          //   );
          //   text.setAttribute("x", (x[i] - TEXT_SIZE / 2).toString());
          //   text.setAttribute("y", (MAX_Y + TEXT_MARGIN).toString());
          //   text.setAttribute("font-size", TEXT_SIZE.toString());
          //   text.setAttribute("vector-effect", "non-scaling-stroke");
          //   text.innerHTML = (i + 1).toString();
          //   refSVG.current.appendChild(text);
        }

        refSVG.current.appendChild(path);
      }
    }
  }, [datas, colors, viewX]);

  return (
    <NormalChartSVG
      ref={refSVG}
      xmlns="https://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewX} ${viewY}`}
      {...styleProps}
    />
  );
}

export function DangerBarChart({ datas }: DangerChartProps) {
  const refSVG = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    const check = _.sortBy(datas);
    const Q1 = check[Math.floor(datas.length / 4)];
    const Q3 = check[Math.floor(datas.length * (3 / 4))];

    if (refSVG.current) {
      while (refSVG.current?.hasChildNodes())
        refSVG.current.removeChild(refSVG.current.firstChild!);

      const margin = (VIEW_X / datas.length) * MARGIN_RATIO;
      const strokeWidth = (VIEW_X - margin * (datas.length - 1)) / datas.length;
      const startX = strokeWidth / 2;

      const x: Array<number> = [startX];
      for (let i = 1; i < datas.length; i++)
        x.push(x[i - 1] + margin + strokeWidth);

      const MAX = Math.max.apply(null, datas);
      const y: Array<number> = [];
      for (let i = 0; i < datas.length; i++) {
        const norm = (datas[i] - 0) / (MAX - 0);
        y.push(MAX_Y - MAX_Y * norm);
      }
      console.log(y);

      for (let i = 0; i < datas.length; i++) {
        const path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        const d = ["M", x[i], MAX_Y, "L", x[i], y[i]];
        path.setAttribute("d", d.join(" "));
        if (datas[i] > Q3) path.classList.add(DangerPalette["danger"]);
        else if (datas[i] > Q1) path.classList.add(DangerPalette["normal"]);
        else path.classList.add(DangerPalette["good"]);

        path.setAttribute("stroke", "#333");
        path.setAttribute("stroke-width", strokeWidth.toString());

        if ((i + 1) % 5 === 0) {
          //   const text = document.createElementNS(
          //     "http://www.w3.org/2000/svg",
          //     "text"
          //   );
          //   text.setAttribute("x", (x[i] - TEXT_SIZE / 2).toString());
          //   text.setAttribute("y", (MAX_Y + TEXT_MARGIN).toString());
          //   text.setAttribute("font-size", TEXT_SIZE.toString());
          //   text.setAttribute("vector-effect", "non-scaling-stroke");
          //   text.innerHTML = (i + 1).toString();
          //   refSVG.current.appendChild(text);
        }

        refSVG.current.appendChild(path);
      }
    }
  }, [datas]);

  return (
    <DangerChartSVG
      ref={refSVG}
      xmlns="https://www.w3.org/2000/svg"
      viewBox={`0 0 ${VIEW_X} ${VIEW_Y}`}
    />
  );
}
