import { EntityState } from "@reduxjs/toolkit";
import { EStoreKeys } from "../../models/enum/EStoreKeys";
import { IGameInitialState } from "../../models/interface/IGameInitialState";
import { TPlayer } from "../../models/type/TPlayer";
import { getLocalStorage } from "../../util/localStorage";
import { gameInitialState } from "../reducers/game/gameInitialState";
import { RootState } from "./store";
import { filledPlayerState } from "../reducers/players/playersSlice";
import { IGamesInitialState } from "../../models/interface/IGamesInitialState";
import { gamesInitialState } from "../reducers/games/gamesInitialState";

export const getPreloadedState = () => {
  const game = getLocalStorage<IGameInitialState>(EStoreKeys.GAME);
  const players = getLocalStorage<EntityState<TPlayer, string>>(
    EStoreKeys.PLAYERS
  );
  const games = getLocalStorage<IGamesInitialState>(EStoreKeys.GAMES);
  let preloadedState: RootState = {
    game: gameInitialState,
    players: filledPlayerState,
    games: gamesInitialState,
  };

  if (game) {
    preloadedState.game = game;
  }
  if (players) {
    preloadedState.players = players;
  }
  if (games) {
    preloadedState.games = games;
  }

  return preloadedState;
};
