export type Board = Row[];
export type Row = number[];

export type Direction = 'start' | 'end';

export type State = {
  board: Board;
  score: number;
};
export type Action = {
  type:
    | 'PUT_NEW_CELL'
    | 'PARK_LEFT'
    | 'PARK_RIGHT'
    | 'PARK_BOTTOM'
    | 'PARK_TOP';
};
