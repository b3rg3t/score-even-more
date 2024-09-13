import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { gameSlice } from "../reducers/game/gameSlice";
import { playersSlice } from "../reducers/players/playersSlice";

const rootReducer = combineReducers({
  game: gameSlice.reducer,
  players: playersSlice.reducer,
})

export const setupStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    preloadedState
});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;