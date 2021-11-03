import { createSlice } from '@reduxjs/toolkit';
import { STEP_TIME } from 'commonapp/constants/time';
import { FIELD_SIZE } from '../constants/size';
import { getRandomInteger } from '../utils';

type CoordinatesType = {
  row: number;
  cell: number;
};

interface SnakeState {
  field: number[][];
  direction: 'top' | 'left' | 'right' | 'bottom';
  isStarted: boolean;
  isPaused: boolean;
  coordinates: CoordinatesType;
  isCrashed: boolean;
  history: CoordinatesType[];
  speed: number;
}

const getSnakeGameField = (size: number) => {
  const field = [];
  for (let i = 0; i < size; i++) {
    field.push(Array.from(Array(size).fill(0)));
  }

  return field;
};

const getRandomCell = (field: number[][]) => {
  const rndRow = getRandomInteger(0, FIELD_SIZE - 1);
  const rndCell = getRandomInteger(0, FIELD_SIZE - 1);
  if (field[rndRow][rndCell]) {
    getRandomCell(field);
  }

  field[rndRow][rndCell] = 2;
  return { rndRow, rndCell };
};

const initialState: SnakeState = {
  field: getSnakeGameField(FIELD_SIZE),
  direction: 'bottom',
  isStarted: false,
  isCrashed: false,
  isPaused: false,
  coordinates: {
    row: 2,
    cell: Math.round(FIELD_SIZE / 2) - 1,
  },
  history: [
    { row: 0, cell: Math.round(FIELD_SIZE / 2) - 1 },
    { row: 1, cell: Math.round(FIELD_SIZE / 2) - 1 },
    { row: 2, cell: Math.round(FIELD_SIZE / 2) - 1 },
  ],
  speed: STEP_TIME,
};

export const snakeSlice = createSlice({
  name: 'snake',
  initialState,
  reducers: {
    startGame: state => {
      state.isStarted = true;
      state.coordinates.cell = Math.round(FIELD_SIZE / 2) - 1;

      const { rndRow, rndCell } = getRandomCell(state.field);

      state.field[rndRow][rndCell] = 2;

      for (let i = 0; i < state.history.length; i++) {
        state.field[state.history[i].row][state.history[i].cell] = 1;
      }
    },

    setPause: state => {
      state.isPaused = !state.isPaused;
    },

    changeDirection: (state, action) => {
      state.direction = action.payload;
    },

    move: state => {
      const {
        field,
        coordinates: { row, cell },
      } = state;

      const history = [...state.history];
      let newCell = null;

      switch (state.direction) {
        case 'top':
          if (row <= 0) {
            state.isCrashed = true;
            break;
          }

          if (field[row - 1][cell] === 2) {
            newCell = {
              row: row - 2,
              cell,
            };
            state.field[row - 2][cell] = 1;
          }

          state.coordinates.row -= 1;
          state.field[row - 1][cell] = 1;
          break;
        case 'bottom':
          if (row >= field[row].length - 1) {
            state.isCrashed = true;
            break;
          }

          if (field[row + 1][cell] === 2) {
            newCell = {
              row: row + 2,
              cell,
            };
            state.field[row + 2][cell] = 1;
          }

          state.coordinates.row += 1;
          state.field[row + 1][cell] = 1;
          break;
        case 'left':
          if (cell <= 0) {
            state.isCrashed = true;
            break;
          }

          if (field[row][cell - 1] === 2) {
            newCell = {
              row,
              cell: cell - 2,
            };
            state.field[row][cell - 2] = 1;
          }

          state.coordinates.cell -= 1;
          state.field[row][cell - 1] = 1;
          break;
        case 'right':
          if (cell >= field[row].length - 1) {
            state.isCrashed = true;
            break;
          }

          if (field[row][cell + 1] === 2) {
            newCell = {
              row,
              cell: cell + 2,
            };
            state.field[row][cell + 2] = 1;
          }

          state.coordinates.cell += 1;
          state.field[row][cell + 1] = 1;
          break;
      }

      history.push(state.coordinates);
      if (newCell) {
        history.push(newCell);
        state.coordinates = newCell;

        const { rndRow, rndCell } = getRandomCell(state.field);

        state.field[rndRow][rndCell] = 2;
      }

      state.field[history[0].row][history[0].cell] = 0;
      history.splice(0, 1);
      state.history = history;
    },

    setSpeed: state => {
      state.speed = state.speed -= 100;
    },

    resetGame: () => {
      return initialState;
    },
  },
});

export const {
  startGame,
  move,
  changeDirection,
  setPause,
  resetGame,
  setSpeed,
} = snakeSlice.actions;

export default snakeSlice.reducer;
