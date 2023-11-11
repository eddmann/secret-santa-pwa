import { RootState } from '..';

export const drawsSelector = (state: RootState) => state.draws.draws;

export const drawStatusSelector = (state: RootState) => state.draws.status;
