import { EntityState } from "@reduxjs/toolkit";
import { EStoreKeys } from "../../models/enum/EStoreKeys";
import { IGameInitialState } from "../../models/interface/IGameInitialState";
import { TPlayer } from "../../models/type/players/TPlayer";
import { getLocalStorage } from "../../util/localStorage";
import { gameInitialState } from "../reducers/game/gameInitialState";
import { RootState } from "./store";
import { filledPlayerState } from "../reducers/players/playersSlice";

export const getPreloadedState = () => {
  const game = getLocalStorage<IGameInitialState>(EStoreKeys.GAME);
  const players = getLocalStorage<EntityState<TPlayer, string>>(
    EStoreKeys.PLAYERS
  );

  let preloadedState: RootState = {
    game: gameInitialState,
    players: filledPlayerState,
  };

  if (game) {
    preloadedState.game = game;
  }
  if (players) {
    preloadedState.players = players;
  }

  return preloadedState;
};
