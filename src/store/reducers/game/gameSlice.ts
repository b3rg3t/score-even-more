import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

import {
  calcPositionByScore,
  calcScoreByPlayer,
  generateNewGame,
  generateNewRound,
  updateGameWithoutPlayer,
} from "./helpers";
import { gameInitialState } from "./gameInitialState";
import { selectAllEntities } from "../players/playersSlice";
import { TPlayer } from "../../../models/type/players/TPlayer";
import { EStoreKeys } from "../../../models/enum/EStoreKeys";
import { TGameSettings } from "../../../models/type/gameSettings/TGameSettings";
import { IGame } from "../../../models/interface/IGame";
import { createGameAction, removeOnePlayerAction } from "../combinedAction";
import { TRound } from "../../../models/type/TRound";
import { TAddRound } from "../../../models/type/gameRound/TAddRound";
import { sortByCreated } from "../../../components/utils/SortByCreated";
import { TBottomModal } from "../../../models/type/TBottomModal";

export const gameSlice = createSlice({
  name: EStoreKeys.GAME,
  initialState: gameInitialState,
  reducers: {
    setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.burgerMenuOpen = action.payload;
    },
    clearRounds: (state) => {
      const newRound = generateNewRound(
        state.activeGame.playerIds,
        state.activeGame.gameSettings.lockOnNewRound
      );
      state.activeGame.rounds = [newRound];
    },
    addOneRound: (state) => {
      state.activeGame.rounds[state.activeGame.rounds.length - 1].isNew = false;
      const newRound = generateNewRound(
        state.activeGame.playerIds,
        state.activeGame.gameSettings.lockOnNewRound,
        state.activeGame.rounds.length
      );

      state.activeGame.rounds.push(newRound);
      state.games = state.games.map((game) => {
        if (state.activeGame.gameId === game.gameId) {
          return { ...game, rounds: [...game.rounds, newRound] };
        }
        return game;
      });
    },
    addPlayerId: (state, action: PayloadAction<TPlayer>) => {
      state.activeGame.playerIds.push(action.payload.playerId);
      state.games = state.games.map((game) => {
        if (state.activeGame.gameId === game.gameId) {
          return {
            ...game,
            playerIds: [...game.playerIds, action.payload.playerId],
          };
        }
        return game;
      });
    },
    removePlayerId: (state, action: PayloadAction<TPlayer["playerId"]>) => {
      state.activeGame.playerIds = state.activeGame.playerIds.filter(
        (player) => player !== action.payload
      );
      state.games = state.games.map((game) => {
        if (state.activeGame.gameId === game.gameId) {
          return {
            ...game,
            playerIds: game.playerIds.filter(
              (player) => player !== action.payload
            ),
          };
        }
        return game;
      });
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
    setScoreboardOpen: (state) => {
      state.activeGame.scoreboardOpen = !state.activeGame.scoreboardOpen;
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
      });

      state.activeGame = {
        ...state.activeGame,
        gameSettings: { ...action.payload },
        rounds: updatedRounds,
      };
      state.burgerMenuOpen = false;
    },
    setDeletePlayer: (state, action: PayloadAction<string>) => {
      state.activeGame.activeBottomModal = "deletePlayer";
      state.activeGame.playerId = action.payload;
    },
    setActiveBottomModal: (state, action: PayloadAction<TBottomModal>) => {
      state.activeGame.activeBottomModal = action.payload;
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
    builder.addCase(removeOnePlayerAction, (state, action) => {
      const updatedGame = updateGameWithoutPlayer(
        state.activeGame,
        action.payload
      );

      const updatedGames = state.games.map((game) => {
        const updateGame2 = updateGameWithoutPlayer(game, action.payload);
        return { ...updateGame2 };
      });

      state.games = updatedGames;
      state.activeGame = updatedGame;
      state.activeGame.playerId = undefined;
      state.activeGame.activeBottomModal = "showPlayers";
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
const selectPlayerId = (state: RootState) => state.game.activeGame.playerId;
const selectPlayerIds = (state: RootState) => state.game.activeGame.playerIds;
const selectGameFinished = (state: RootState) =>
  state.game.activeGame.gameFinished;
const selectScoreboardOpen = (state: RootState) =>
  state.game.activeGame.scoreboardOpen;
const selectSlideRound = (state: RootState) =>
  state.game.activeGame.gameSettings.slideRound;
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

const selectRoundsOrderByCreatedASC = createSelector(
  [selectAllRounds],
  (rounds) => sortByCreated(rounds).map((round) => round.roundId)
);

const selectRoundsOrderByCreatedDESC = createSelector(
  [selectAllRounds],
  (rounds) => rounds.map((round) => round.roundId)
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

const selectActiveBottomModal = (state: RootState) =>
  state.game.activeGame.activeBottomModal;

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
  setScoreboardOpen,
  setGameSettings,
  setActiveGame,
  setRoundLock,
  updateGameSettings,
  setActiveBottomModal,
  setDeletePlayer,
} = gameSlice.actions;

export {
  selectMenuOpen,
  selectIsDemoGame,
  selectTotalRounds,
  selectPlayerIds,
  selectPlayerId,
  selectScoreByPlayer,
  selectSortedScoreByPlayer,
  selectPlayersProfile,
  selectScoreboardOpen,
  selectSlideRound,
  selectGameFinished,
  selectGameName,
  selectByGameId,
  selectAllGameIds,
  selectActiveBottomModal,
  selectActiveGameId,
  selectActiveGameLockRound,
  selectSpecificRound,
  selectActiveGame,
  // Rounds
  selectAllRounds,
  selectRoundById,
  selectRoundsOrderByCreatedASC,
  selectRoundsOrderByCreatedDESC,
};
