import React, { useEffect } from 'react';
import * as Styles from './styles';
import { useBoard } from './useBoard';
import { Board } from './types';

const App: React.FC<{}> = () => {
  const { board, score } = useBoard();

  return (
    <div>
      <Styles.Board>
        {board.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <Styles.Cell
              key={`${colIdx}${rowIdx}`}
              rowIdx={rowIdx}
              colIdx={colIdx}
              num={cell}
            >
              {cell > 0 && cell}
            </Styles.Cell>
          ))
        )}
      </Styles.Board>
      {score}
    </div>
  );
};
export default App;
