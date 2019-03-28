import _ from 'lodash';
import { Board, Row, Direction } from './types';

export const mergeable = (row: Row): boolean => {
  return row.some((cell, idx, arr) => cell > 0 && arr[idx + 1] === cell);
};

export const movableToStart = (row: Row): boolean => {
  return row.indexOf(0) < row.filter(cell => cell !== 0).length;
};

export const movableToEnd = (row: Row): boolean => {
  return movableToStart([...row].reverse());
};

export const movableToLeft = (board: Board): boolean => {
  return board.some(row => {
    return mergeable(row) || movableToStart(row);
  });
};

export const movableToRight = (board: Board): boolean => {
  return board.some(row => mergeable(row) || movableToEnd(row));
};
export const movableToTop = (board: Board): boolean => {
  return transpose(board).some(row => mergeable(row) || movableToStart(row));
};
export const movableToBottom = (board: Board): boolean => {
  return transpose(board).some(row => mergeable(row) || movableToEnd(row));
};

export const transpose = (array: Board): Board =>
  array[0].map((col, i) => array.map(row => row[i]));

export const fillStart = (row: Row, toLength: number) => {
  const length = row.length;
  return [...Array(toLength - length).fill(0), ...row];
};

export const fillEnd = (row: Row, toLength: number) => {
  const length = row.length;
  return [...row, ...Array(toLength - length).fill(0)];
};

export const parkRowTo = (
  row: Row,
  dir: Direction
): { newRow: Row; scoreAdded: number } => {
  const withoutZero: Row = row.filter(cell => cell !== 0);

  if (dir === 'start') {
    let merged = false;
    let scoreAdded = 0;
    const newRow = fillEnd(
      withoutZero.reduce(
        (result, cell, idx, arr) => {
          if (merged) {
            merged = false;
            return result;
          }
          if (arr[idx + 1] && cell === arr[idx + 1]) {
            merged = true;
            scoreAdded += cell * 2;
            return [...result, cell * 2];
          }
          return [...result, cell];
        },
        [] as Row
      ),
      row.length
    );
    return { newRow, scoreAdded };
  } else {
    let merged = false;
    let scoreAdded = 0;
    const newRow = fillStart(
      withoutZero.reduceRight(
        (result, cell, idx, arr) => {
          if (merged) {
            merged = false;
            return result;
          }
          if (arr[idx - 1] && cell === arr[idx - 1]) {
            merged = true;
            scoreAdded += cell * 2;
            return [cell * 2, ...result];
          }
          return [cell, ...result];
        },
        [] as Row
      ),
      row.length
    );
    return { newRow, scoreAdded };
  }
};

export const putRandCell = (board: Board): Board => {
  const empty: number[][] = [];
  board.forEach((row, rowIdx) =>
    row.forEach((cell, colIdx) => {
      if (cell === 0) {
        empty.push([rowIdx, colIdx]);
      }
    })
  );
  const randCoord = _.sample(empty);

  const newBoard = _.cloneDeep(board);

  if (randCoord) {
    const [row, col] = randCoord;
    newBoard[row][col] = _.sample([2, 4]) || 2;
  }

  return newBoard;
};
