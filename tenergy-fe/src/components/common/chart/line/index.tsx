import _ from "lodash";
import React from "react";
import { LineChartSVG } from "./styles";
import { LineChartProps } from "./types";

const VIEW_X = 350,
  VIEW_Y = 100;

export function LineChart({ datas, colors }: LineChartProps) {
  const refSVG = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    while (refSVG.current?.hasChildNodes()) {
      refSVG.current.removeChild(refSVG.current.firstChild!);
    }

    const dataLength = datas.length;

    const increaseX = VIEW_X / (dataLength - 1);

    const min = _.min(_.flatten(datas))!;
    const max = _.max(_.flatten(datas))!;

    // d.push("M");
    // d.push(0, svgInfo.viewY);

    datas.forEach((data, idx) => {
      const d: Array<string | number> = [];

      data.forEach((y, yIdx) => {
        if (yIdx === 0) d.push("M");
        else d.push("L");
        const xEnd = increaseX * yIdx;
        const norm = (y - min) / (max - min);
        const yEnd = VIEW_Y * (1 - norm);

        d.push(xEnd, yEnd);
      });

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );

      path.setAttribute("d", d.join(" "));
      path.setAttribute("fill", "none");
      path.classList.add(colors[idx]);
      path.setAttribute("stroke-width", "3");
      path.setAttribute("stroke-linejoin", "round");
      path.setAttribute("vector-effect", "non-scaling-stroke");

      refSVG.current?.appendChild(path);
    });
  }, [datas, colors]);

  return (
    <LineChartSVG
      ref={refSVG}
      xmlns="https://www.w3.org"
      viewBox={[0, 0, VIEW_X, VIEW_Y].join(" ")}
    />
  );
}
