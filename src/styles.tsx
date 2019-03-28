import { css } from '@emotion/core';
import styled from '@emotion/styled';

const colors: { [cell: number]: any } = {
  2: {
    bg: '#eee4da'
  }
};

export const Board = styled.div`
  border: 1px solid #000;
  height: 300px;
  width: 300px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  padding: 10px;
  gap: 10px;
`;

export const Cell = styled.div<{ rowIdx: number; colIdx: number; num: number }>(
  ({ rowIdx, colIdx, num }) => css`
    border: 1px solid #000;
    grid-row: ${rowIdx + 1};
    grid-column: ${colIdx + 1};
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 24px;
    font-weight: 600;
  `
);
