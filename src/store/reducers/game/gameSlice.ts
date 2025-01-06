import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

import { calcTotalScore, generateNewGame, generateNewRound } from "./helpers";
import { gameInitialState } from "./gameInitialState";
import { selectAllEntities } from "../players/playersSlice";
import { TPlayer } from "../../../models/type/TPlayer";
import { EStoreKeys } from "../../../models/enum/EStoreKeys";
import { TGameSettings } from "../../../models/type/gameSettings/TGameSettings";
import { IGame } from "../../../models/interface/IGame";
import { createGameAction } from "../combinedAction";

export const gameSlice = createSlice({
  name: EStoreKeys.GAME,
  initialState: gameInitialState,
  reducers: {
    clearRounds: (state) => {
      state.activeGame.rounds = [generateNewRound(state.activeGame.playerIds)];
    },
    addOneRound: (state) => {
      state.activeGame.rounds.push(
        generateNewRound(
          state.activeGame.playerIds,
          state.activeGame.rounds.length
        )
      );
    },
    addPlayerId: (state, action: PayloadAction<TPlayer>) => {
      state.activeGame.playerIds.push(action.payload.playerId);
    },
    removePlayerId: (state, action: PayloadAction<TPlayer["playerId"]>) => {
      state.activeGame.playerIds = state.activeGame.playerIds.filter(
        (player) => player !== action.payload
      );
    },
    setAllPlayerIds: (state, action: PayloadAction<TPlayer[]>) => {
      state.activeGame.playerIds = action.payload.map(
        (player) => player.playerId
      );
    },
    removeOneRound: (state, action) => {
      state.activeGame.rounds = state.activeGame.rounds.filter(
        (round) => round.roundId !== action.payload
      );
    },
    scoreAdded: (state, action: PayloadAction<any>) => {
      const existingScore = state.activeGame.rounds.find(
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
      state.activeGame.gameFinished = !state.activeGame.gameFinished;
    },
    setGameSettings: (state, action: PayloadAction<TGameSettings>) => {
      state.activeGame.gameSettings = action.payload;
    },
    setActiveGame: (state, action: PayloadAction<IGame>) => {
      const updatedGames = state.games.map((game) => {
        if (game.gameId === state.activeGame.gameId) {
          return state.activeGame;
        }
        return game;
      });

      const newActiveGame = state.games.find(
        (game) => game.gameId === action.payload.gameId
      );

      state.games = updatedGames;

      if (newActiveGame) {
        state.activeGame = newActiveGame;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createGameAction, (state, action) => {
      const newGame = generateNewGame(action.payload);

      const updatedGames = state.games.map((game) => {
        if (game.gameId === state.activeGame.gameId) {
          return state.activeGame;
        }
        return game;
      });

      state.games = [...updatedGames, newGame];
      state.activeGame = newGame;
    });
  },
});

const selectIsDemoGame = (state: RootState) =>
  state.game.activeGame.gameSettings?.isDemo;
const selectAllRounds = (state: RootState) => state.game.activeGame.rounds;
const selectTotalRounds = (state: RootState) =>
  state.game.activeGame.rounds.length;
const selectPlayerIds = (state: RootState) => state.game.activeGame.playerIds;
const selectGameFinished = (state: RootState) =>
  state.game.activeGame.gameFinished;
const selectGameName = (state: RootState) =>
  state.game.activeGame.gameSettings?.gameName;
const selectAllGames = (state: RootState) => state.game;
const selectActiveGame = (state: RootState) => state.game.activeGame;
const selectAllGameIds = (state: RootState) =>
  // Temp filter for demo game
  state.game.games
    .filter((game) => !game.gameSettings?.isDemo)
    .map((game) => game.gameId);

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

const selectByGameId = (gameId: IGame["gameId"]) =>
  createSelector([selectAllGames], (game) =>
    game.games.find((game) => game.gameId === gameId)
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
  setActiveGame,
} = gameSlice.actions;

export {
  selectIsDemoGame,
  selectAllRounds,
  selectTotalRounds,
  selectPlayerIds,
  selectScoreByPlayer,
  selectPlayersProfile,
  selectGameFinished,
  selectGameName,
  selectByGameId,
  selectAllGameIds,
  selectActiveGame
};
