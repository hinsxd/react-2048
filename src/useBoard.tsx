import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Board } from './types';

import {
  transpose,
  putRandCell,
  parkRowTo,
  movableToBottom,
  movableToTop,
  movableToLeft,
  movableToRight
} from './utils';

const randomInitBoard = (): Board => {
  const board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  let coord1 = [_.random(0, 3), _.random(0, 3)];
  let coord2 = [_.random(0, 3), _.random(0, 3)];
  while (_.isEqual(coord2, coord1)) {
    coord2 = [_.random(0, 3), _.random(0, 3)];
  }
  board[coord1[0]][coord1[1]] = 2;
  board[coord2[0]][coord2[1]] = 2;
  return board;
};

export const useBoard = () => {
  const [board, setBoard] = useState(randomInitBoard());
  const [score, setScore] = useState(0);

  const addScore = (amount: number) => {
    setScore(score => score + amount);
  };

  const moveUp = () => {
    if (movableToTop(board)) {
      let _scoreAdded = 0;
      setBoard(board =>
        transpose(
          transpose(board).map(row => {
            const { newRow, scoreAdded } = parkRowTo(row, 'start');
            _scoreAdded += scoreAdded;
            return newRow;
          })
        )
      );
      addScore(_scoreAdded);
      setBoard(board => putRandCell(board));
    }
  };
  const moveDown = () => {
    if (movableToBottom(board)) {
      let _scoreAdded = 0;
      setBoard(board =>
        transpose(
          transpose(board).map(row => {
            const { newRow, scoreAdded } = parkRowTo(row, 'end');
            _scoreAdded += scoreAdded;
            return newRow;
          })
        )
      );
      addScore(_scoreAdded);
      setBoard(board => putRandCell(board));
    }
  };
  const moveLeft = () => {
    if (movableToLeft(board)) {
      let _scoreAdded = 0;
      setBoard(board =>
        board.map(row => {
          const { newRow, scoreAdded } = parkRowTo(row, 'start');
          _scoreAdded += scoreAdded;
          return newRow;
        })
      );
      addScore(_scoreAdded);
      setBoard(board => putRandCell(board));
    }
  };
  const moveRight = () => {
    if (movableToRight(board)) {
      let _scoreAdded = 0;
      setBoard(board =>
        board.map(row => {
          const { newRow, scoreAdded } = parkRowTo(row, 'end');
          _scoreAdded += scoreAdded;
          return newRow;
        })
      );
      addScore(_scoreAdded);
      setBoard(board => putRandCell(board));
    }
  };
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case 37:
        moveLeft();
        return;
      case 38:
        moveUp();
        return;
      case 39:
        moveRight();
        return;
      case 40:
        moveDown();
        return;
      default:
        return;
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  return { board, handleKeyDown, score };
};
