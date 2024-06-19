import { configureStore } from '@reduxjs/toolkit';
import { roundSlice } from '../reducers/rounds';
import { playersSlice } from '../reducers/players';

export const store = configureStore({
  reducer: {
    round: roundSlice.reducer,
    players: playersSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;