import styled, { css } from "styled-components";
import { TableColStyleProps } from "./types";

export const TableWrap = styled.table`
  width: 100%;
`;

export const TableHead = styled.thead``;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  height: 44px;
  display: flex;
  flex-direction: row;
  margin: 0 0 10px;
`;

export const TableCol = styled.td<TableColStyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;

  ${({ width }) =>
    width
      ? css`
          width: ${width}px;
        `
      : css`
          flex: 1;
        `}

  ${({ isCursor }) =>
    isCursor &&
    css`
      cursor: pointer;
    `}
`;
