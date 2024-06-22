import { configureStore } from '@reduxjs/toolkit';
import { gameSlice } from '../reducers/game/gameSlice';
import { playersSlice } from '../reducers/players/playersSlice';

export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
    players: playersSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;