/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

const colors = (
  num: number
): {
  background: string;
  text: string;
} => {
  let background = 'rgba(238, 228, 218, 0.35);';
  let text = '#776e65';
  if (num >= 8) {
    text = '#f9f6f2';
  }
  switch (num) {
    case 2:
      background = '#eee4da';
      break;
    case 4:
      background = '#ede0c8';
      break;
    case 8:
      background = '#f2b179';
      break;
    case 16:
      background = '#f59563';
      break;
    case 32:
      background = '#f67c5f';
      break;
    case 64:
      background = '#f65e3b';
      break;
    case 128:
      background = '#edcf72';
      break;
    case 256:
      background = '#edcc61';
      break;
    case 512:
      background = '#edc850';
      break;
    case 1024:
      background = '#edc53f';
      break;
    case 2048:
      background = '#edc22e';
      break;
    default:
      break;
  }
  return {
    background,
    text
  };
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
  background-color: rgb(187, 173, 160);
`;

export const Cell = styled.div<{
  rowIdx: number;
  colIdx: number;
  num: number;
}>(({ rowIdx, colIdx, num }) => {
  const { background, text } = colors(num);
  return css`
    grid-row: ${rowIdx + 1};
    grid-column: ${colIdx + 1};
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${background};
    color: ${text};

    font-size: 24px;
    font-weight: 600;
  `;
});
