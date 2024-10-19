import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { gameSlice } from "../reducers/game/gameSlice";
import { playersSlice } from "../reducers/players/playersSlice";
import { gameMiddleware } from "../reducers/game/gameMiddleware";
import { getPreloadedState } from "./preloadedState";
import { EStoreKeys } from "../../models/enum/EStoreKeys";
import { gamesSlice } from "../reducers/games/gamesSlice";

const rootReducer = combineReducers({
  [EStoreKeys.GAME]: gameSlice.reducer,
  [EStoreKeys.PLAYERS]: playersSlice.reducer,
  [EStoreKeys.GAMES]: gamesSlice.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(gameMiddleware),
    preloadedState: getPreloadedState(),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
