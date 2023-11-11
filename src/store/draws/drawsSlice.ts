import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DrawId, Draw, Entry } from '../../types';
import { draw } from './actions';
export { draw } from './actions';

type State = {
  draws: Draw[];
  status:
    | { type: 'idle' | 'drawing' }
    | { type: 'drawn'; id: DrawId }
    | { type: 'failed'; entry: Entry; reason: string };
};

export const initialState: State = {
  draws: [],
  status: { type: 'idle' },
};

export const drawsSlice = createSlice({
  name: 'draws',
  initialState,
  reducers: {
    removeDraw(state, action: PayloadAction<DrawId>) {
      state.draws = state.draws.filter((draw) => draw.id !== action.payload);
    },
    clearDrawStatus(state) {
      state.status = { type: 'idle' };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(draw.pending, (state) => {
      state.status = { type: 'drawing' };
    });
    builder.addCase(draw.fulfilled, (state, action) => {
      state.status = { type: 'drawn', id: action.payload.id };
      state.draws.push(action.payload);
    });
    builder.addCase(draw.rejected, (state, action) => {
      state.status = {
        type: 'failed',
        entry: action.meta.arg,
        reason: action.error.message ?? '',
      };
    });
  },
});

export const { removeDraw, clearDrawStatus } = drawsSlice.actions;
