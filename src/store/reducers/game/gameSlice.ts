import {
  PayloadAction,
  createSelector,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

import { calcTotalScore, getDefaultScore } from "./helpers";
import { gameInitialState } from "./gameInitialState";
import { TRound } from "../../../models/type/TRound";
import { selectAllEntities } from "../players/playersSlice";
import { TGameTypeOption } from "../../../models/type/TGameTypeOptions";
import { TPlayer } from "../../../models/type/TPlayer";
import { IGameInitialState } from "../../../models/interface/IGameInitialState";
import { EStoreKeys } from "../../../models/enum/EStoreKeys";

export const gameSlice = createSlice({
  name: EStoreKeys.GAME,
  initialState: gameInitialState,
  reducers: {
    setDisplayUsers: (
      state,
      action: PayloadAction<IGameInitialState["displayUsers"]>
    ) => {
      state.displayUsers = action.payload;
    },
    setGameType: (
      state,
      action: PayloadAction<TGameTypeOption | undefined>
    ) => {
      state.gameType = action.payload;
    },
    clearRounds: (state, _action: PayloadAction<undefined>) => {
      const defaultScore = getDefaultScore(state.playerIds);

      const newRound: TRound = {
        roundId: nanoid(),
        round: 1,
        created: new Date().toLocaleString(),
        score: defaultScore,
      };

      state.rounds = [newRound];
    },
    addOneRound: (state, _action: PayloadAction<undefined>) => {
      const defaultScore = getDefaultScore(state.playerIds);

      const newRound: TRound = {
        roundId: nanoid(),
        round: state.rounds.length + 1,
        created: new Date().toLocaleString(),
        score: defaultScore,
      };

      state.rounds.push(newRound);
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
    setGameFinished: (
      state
    ) => {
      state.gameFinished = !state.gameFinished;
    },
  },
});

const selectDisplayUsers = (state: RootState) => state.game.displayUsers;
const selectAllRounds = (state: RootState) => state.game.rounds;
const selectTotalRounds = (state: RootState) => state.game.rounds.length;
const selectPlayerIds = (state: RootState) => state.game.playerIds;
const selectGameType = (state: RootState) => state.game.gameType;
const selectGameFinished = (state: RootState) => state.game.gameFinished;

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
  setDisplayUsers,
  setGameType,
  clearRounds,
  addOneRound,
  addPlayerId,
  removePlayerId,
  setAllPlayerIds,
  removeOneRound,
  scoreAdded,
  setGameFinished,
} = gameSlice.actions;

export {
  selectDisplayUsers,
  selectAllRounds,
  selectTotalRounds,
  selectGameType,
  selectPlayerIds,
  selectScoreByPlayer,
  selectPlayersProfile,
  selectGameFinished,
};
