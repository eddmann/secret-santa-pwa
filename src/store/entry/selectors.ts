import { RootState } from '..';

export const entrySelector = (state: RootState) => state.entry;

export const titleSelector = (state: RootState) => state.entry.title;

export const paripicantsSelector = (state: RootState) => state.entry.participants;

export const exclusionsSelector = (state: RootState) => state.entry.exclusions;
