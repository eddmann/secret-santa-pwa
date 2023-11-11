import { configureStore } from '@reduxjs/toolkit';
import { entrySlice } from './entry';
import { drawsSlice } from './draws/drawsSlice';
import { Draw } from '../types';

const LOCAL_STORAGE_DRAW_KEY = 'draws';

let preloadedState = undefined;
try {
  const localDraws = localStorage.getItem(LOCAL_STORAGE_DRAW_KEY);
  preloadedState = {
    draws: {
      ...drawsSlice.getInitialState(),
      draws: localDraws ? (JSON.parse(localDraws) as Draw[]) : drawsSlice.getInitialState().draws,
    },
  };
} catch {
  // ignored
}

export const store = configureStore({
  reducer: {
    entry: entrySlice.reducer,
    draws: drawsSlice.reducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  try {
    localStorage.setItem(LOCAL_STORAGE_DRAW_KEY, JSON.stringify(store.getState().draws.draws));
  } catch {
    // ignored
  }
});
