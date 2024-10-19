import {
  PayloadAction,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

import { calcTotalScore } from "./helpers";
import { gameInitialState } from "./gameInitialState";
import { selectAllEntities } from "../players/playersSlice";
import { TPlayer } from "../../../models/type/TPlayer";
import { EStoreKeys } from "../../../models/enum/EStoreKeys";
import { TGameSettings } from "../../../models/type/gameSettings/TGameSettings";
import { IGameInitialState } from "../../../models/interface/IGameInitialState";
import { generateNewRound } from "../helpers";

export const gameSlice = createSlice({
  name: EStoreKeys.GAME,
  initialState: gameInitialState,
  reducers: {
    clearRounds: (state) => {
      state.rounds = [generateNewRound(state.playerIds)];
    },
    addOneRound: (state) => {
      state.rounds.push(generateNewRound(state.playerIds, state.rounds.length));
    },
    addPlayerId: (state, action: PayloadAction<TPlayer>) => {
      state.playerIds.push(action.payload.playerId);
    },
    removePlayerId: (state, action: PayloadAction<TPlayer["playerId"]>) => {
      state.playerIds = state.playerIds.filter(
        (player) => player !== action.payload
      );
    },
    setAllPlayerIds: (state, action: PayloadAction<TPlayer[]>) => {
      state.playerIds = action.payload.map((player) => player.playerId);
    },
    removeOneRound: (state, action) => {
      state.rounds = state.rounds.filter(
        (round) => round.roundId !== action.payload
      );
    },
    scoreAdded: (state, action: PayloadAction<any>) => {
      const existingScore = state.rounds.find(
        (round) => round.roundId === action.payload.roundId
      );

      if (existingScore) {
        if (existingScore.score?.[action.payload.score.player]) {
          existingScore.score = {
            ...existingScore.score,
            [action.payload.score.player]:
              existingScore.score?.[action.payload.score.player] +
              action.payload.score.score,
          };
          return;
        } else {
          existingScore.score = {
            ...existingScore.score,
            [action.payload.score.player]: action.payload.score.score,
          };
        }
      }
    },
    setGameFinished: (state) => {
      state.gameFinished = !state.gameFinished;
    },
    setGameSettings: (state, action: PayloadAction<TGameSettings>) => {
      state.gameSettings = action.payload;
    },
    setActiveGame: (state, action: PayloadAction<IGameInitialState>) => {
      return {...state, ...action.payload}
    }
  },
  // extraReducers: (builder) => {
  //   builder.addCase(createGameAction, (state, action) => {
  //     return {...state, ...generateNewGame(action.payload)}
  //   });
  // },
});

const selectAllRounds = (state: RootState) => state.game.rounds;
const selectTotalRounds = (state: RootState) => state.game.rounds.length;
const selectPlayerIds = (state: RootState) => state.game.playerIds;
const selectGameFinished = (state: RootState) => state.game.gameFinished;
const selectGameName = (state: RootState) => state.game.gameSettings?.gameName 

// createSelectors (memoized values)
const selectScoreByPlayer = createSelector(selectAllRounds, (state) =>
  calcTotalScore(state)
);

const selectPlayersProfile = createSelector(
  [selectPlayerIds, selectAllEntities],
  (playerIds, players) => {
    return playerIds.map((player) => players[player]);
  }
);

export const {
  clearRounds,
  addOneRound,
  addPlayerId,
  removePlayerId,
  setAllPlayerIds,
  removeOneRound,
  scoreAdded,
  setGameFinished,
  setGameSettings,
  setActiveGame
} = gameSlice.actions;

export {
  selectAllRounds,
  selectTotalRounds,
  selectPlayerIds,
  selectScoreByPlayer,
  selectPlayersProfile,
  selectGameFinished,
  selectGameName
};
