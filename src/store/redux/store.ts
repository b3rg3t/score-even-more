import { configureStore } from '@reduxjs/toolkit';
import { roundSlice } from '../reducers/rounds/roundsSlice';
import { playersSlice } from '../reducers/players/playersSlice';

export const store = configureStore({
  reducer: {
    game: roundSlice.reducer,
    players: playersSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;