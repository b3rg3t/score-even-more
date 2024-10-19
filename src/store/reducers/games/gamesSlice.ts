import { createSelector, createSlice } from "@reduxjs/toolkit";
import { EStoreKeys } from "../../../models/enum/EStoreKeys";
import { gamesInitialState } from "./gamesInitialState";
import { createGameAction } from "../combinedAction";
import { generateNewGame } from "./helpers";
import { RootState } from "../../redux/store";
import { IGameInitialState } from "../../../models/interface/IGameInitialState";

export const gamesSlice = createSlice({
  name: EStoreKeys.GAMES,
  initialState: gamesInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createGameAction, (state, action) => {82204556
      state.push(generateNewGame(action.payload));
    });
  },
});

const selectAllGames = (state: RootState) => state.games;

const selectAllGameIds = createSelector([selectAllGames], (games) =>
  games.map((game) => game.gameId));

const selectByGameId = (gameId: IGameInitialState["gameId"]) => createSelector([selectAllGames], (games) =>
  games.find((game) => game.gameId === gameId)
);

export { selectAllGameIds, selectByGameId };
