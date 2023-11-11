import { createAsyncThunk } from '@reduxjs/toolkit';
import { Entry } from '../../types';
import { allocator } from './allocator';

export const draw = createAsyncThunk('draws/draw', async (entry: Entry) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    id: '' + new Date().getTime(),
    entry,
    allocation: allocator(entry),
    at: new Date().getTime(),
  };
});
