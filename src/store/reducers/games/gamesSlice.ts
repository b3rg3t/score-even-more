import { createSlice } from "@reduxjs/toolkit";
import { EStoreKeys } from "../../../models/enum/EStoreKeys";
import { gamesInitialState } from "./gamesInitialState";
import { createGameAction } from "../combinedAction";
import { generateNewGame } from "./helpers";
import { RootState } from "../../redux/store";

export const gamesSlice = createSlice({
  name: EStoreKeys.GAMES,
  initialState: gamesInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createGameAction, (state, action) => {
      state.push(generateNewGame(action.payload));
    });
  },
});

const selectAllGames = (state: RootState) =>
  state.games.map((game) => ({
    name: game.gameSettings?.gameName ?? "Unknown",
    id: game.gameId,
  }));

export { selectAllGames };
