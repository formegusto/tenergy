import styled, { css } from "styled-components";
import { DoughnutStyleProps } from "./types";

export function Doughnut({ size }: DoughnutStyleProps) {
  return (
    <Wrap
      className="flex flex-row justify-center items-center relative"
      size={size}
    >
      <Title>368</Title>
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
