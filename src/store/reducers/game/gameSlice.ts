import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

import {
  calcPositionByScore,
  calcScoreByPlayer,
  generateNewGame,
  generateNewRound,
} from "./helpers";
import { gameInitialState } from "./gameInitialState";
import { selectAllEntities } from "../players/playersSlice";
import { TPlayer } from "../../../models/type/TPlayer";
import { EStoreKeys } from "../../../models/enum/EStoreKeys";
import { TGameSettings } from "../../../models/type/gameSettings/TGameSettings";
import { IGame } from "../../../models/interface/IGame";
import { createGameAction } from "../combinedAction";
import { TRound } from "../../../models/type/TRound";
import { TAddRound } from "../../../models/type/gameRound/TAddRound";
import { sortByCreated } from "../../../components/utils/SortByCreated";

export const gameSlice = createSlice({
  name: EStoreKeys.GAME,
  initialState: gameInitialState,
  reducers: {
    setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.burgerMenuOpen = action.payload;
    },
    clearRounds: (state) => {
      state.activeGame.rounds = [
        generateNewRound(
          state.activeGame.playerIds,
          state.activeGame.gameSettings.lockOnNewRound
        ),
      ];
    },
    addOneRound: (state) => {
      state.activeGame.rounds.push(
        generateNewRound(
          state.activeGame.playerIds,
          state.activeGame.gameSettings.lockOnNewRound,
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
    setRoundLock: (state, action: PayloadAction<TRound["roundId"]>) => {
      state.activeGame.rounds = state.activeGame.rounds.map((round) => {
        if (round.roundId === action.payload) {
          return { ...round, isRoundLocked: !round.isRoundLocked };
        }
        return round;
      });
    },
    setScoreByValue: (state, action: PayloadAction<TAddRound>) => {
      const existingScore = state.activeGame.rounds.find(
        (round) => round.roundId === action.payload.roundId
      );
      if (existingScore) {
        if (existingScore.score?.[action.payload.score.player]) {
          existingScore.score = {
            ...existingScore.score,
            [action.payload.score.player]: action.payload.score.score,
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
    scoreAdded: (state, action: PayloadAction<TAddRound>) => {
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
    updateGameSettings: (state, action: PayloadAction<TGameSettings>) => {
      state.games = state.games.map((game) => {
        if (game.gameId === state.activeGame.gameId) {
          return { ...game, gameSettings: { ...action.payload } };
        }
        return game;
      });

      const updatedRounds = state.activeGame.rounds.map((round, idx) => {
        if (idx === state.activeGame.rounds.length - 1) {
          return { ...round, isRoundLocked: action.payload.lockOnNewRound };
        }
        return round;
      })

      state.activeGame = {
        ...state.activeGame,
        gameSettings: { ...action.payload },
        rounds: updatedRounds,
      };
      state.burgerMenuOpen = false;
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

const selectGames = (state: RootState) => state.game.games;
const selectMenuOpen = (state: RootState) => state.game.burgerMenuOpen;
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
const selectAllGameIds = createSelector([selectGames], (game) =>
  game.filter((game) => !game.gameSettings?.isDemo).map((game) => game.gameId)
);

const selectActiveGameId = (state: RootState) => state.game.activeGame.gameId;
const selectActiveGameLockRound = (state: RootState) =>
  state.game.activeGame.gameSettings?.lockOnNewRound;

const selectRoundById = (roundId: TRound["roundId"]) => (state: RootState) =>
  state.game.activeGame.rounds.find((round) => round.roundId === roundId);

const selectRoundsOrderByCreated = createSelector([selectAllRounds], (rounds) =>
  sortByCreated(rounds).map((round) => round.roundId)
);

const selectSortedScoreByPlayer = createSelector(
  [selectAllRounds, selectPlayerIds, selectAllEntities],
  (rounds, playerIds, players) =>
    calcPositionByScore(
      rounds,
      playerIds.map((player) => players[player])
    )
);

const selectScoreByPlayer = createSelector(
  [selectAllRounds, selectPlayerIds, selectAllEntities],
  (rounds, playerIds, players) =>
    calcScoreByPlayer(
      rounds,
      playerIds.map((player) => players[player])
    )
);

const selectPlayersProfile = createSelector(
  [selectPlayerIds, selectAllEntities],
  (playerIds, players) => {
    return playerIds.map((player) => players[player]);
  }
);

const selectSpecificRound =
  (roundId: TRound["roundId"]) => (state: RootState) =>
    state.game.activeGame.rounds.find((round) => round.roundId === roundId);

const selectByGameId = (gameId: IGame["gameId"]) =>
  createSelector([selectAllGames], (game) =>
    game.games.find((game) => game.gameId === gameId)
  );

export const {
  setIsMenuOpen,
  clearRounds,
  addOneRound,
  addPlayerId,
  removePlayerId,
  setAllPlayerIds,
  removeOneRound,
  scoreAdded,
  setScoreByValue,
  setGameFinished,
  setGameSettings,
  setActiveGame,
  setRoundLock,
  updateGameSettings,
} = gameSlice.actions;

export {
  selectMenuOpen,
  selectIsDemoGame,
  selectTotalRounds,
  selectPlayerIds,
  selectScoreByPlayer,
  selectSortedScoreByPlayer,
  selectPlayersProfile,
  selectGameFinished,
  selectGameName,
  selectByGameId,
  selectAllGameIds,
  selectActiveGameId,
  selectActiveGameLockRound,
  selectSpecificRound,
  selectActiveGame,
  // Rounds
  selectAllRounds,
  selectRoundById,
  selectRoundsOrderByCreated,
};
