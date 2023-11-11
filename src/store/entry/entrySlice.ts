import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Entry, Participant } from '../../types';

export const initialState: Entry = {
  type: 'local',
  title: '',
  participants: [],
  exclusions: {},
};

export const entrySlice = createSlice({
  name: 'entry',
  initialState,
  reducers: {
    startLocalDraw() {
      return {
        type: 'local',
        title: '',
        participants: [],
        exclusions: {},
      };
    },
    startRemoteDraw() {
      return {
        type: 'remote',
        title: '',
        participants: [],
        exclusions: {},
      };
    },
    updateTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    addParticipant(state, action: PayloadAction<Participant>) {
      state.participants = [...state.participants, action.payload];
    },
    removeParticipant(state, action: PayloadAction<Participant>) {
      state.participants = state.participants.filter((participant) => participant !== action.payload);
      state.exclusions = Object.keys(state.exclusions).reduce(
        (exclusions, participant) =>
          participant === action.payload || !state.exclusions[participant]
            ? exclusions
            : {
                ...exclusions,
                [participant]: state.exclusions[participant].filter((excluded) => excluded !== participant),
              },
        {},
      );
    },
    toggleExclusion(state, action: PayloadAction<{ participant: Participant; exclusion: Participant }>) {
      const { participant, exclusion } = action.payload;
      const exclusions = state.exclusions[participant] ?? [];
      state.exclusions = {
        ...state.exclusions,
        [participant]: exclusions.includes(exclusion)
          ? exclusions.filter((excluded) => excluded !== exclusion)
          : [...exclusions, exclusion],
      };
    },
  },
});

export const { startLocalDraw, startRemoteDraw, updateTitle, addParticipant, removeParticipant, toggleExclusion } =
  entrySlice.actions;
