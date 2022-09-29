import styled, { css } from "styled-components";
import { NormalChartStyleProps } from "./types";

export const DangerChartSVG = styled.svg`
  width: 100%;
  height: 600px;
`;

export const NormalChartSVG = styled.svg<NormalChartStyleProps>`
  width: 100%;
  ${(isFull) =>
    isFull
      ? css`
          height: 100%;
        `
      : css`
          height: 200px;
        `}
`;
