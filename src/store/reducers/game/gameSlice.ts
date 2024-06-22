import {
  PayloadAction,
  createSelector,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

import { calcTotalScore, getDefaultScore } from "./helper";
import { IGameInitialState, gameInitialState } from "./gameInitialState";
import { TRound } from "../../../models/type/TRound";

export const gameSlice = createSlice({
  name: "game",
  initialState: gameInitialState,
  reducers: {
    setDisplayUsers: (
      state,
      action: PayloadAction<IGameInitialState["displayUsers"]>
    ) => {
      state.displayUsers = action.payload;
    },
    clearRounds: (state, _action: PayloadAction<undefined>) => {
      const defaultScore = getDefaultScore(state.playerIds);

      const newRound: TRound = {
        roundId: nanoid(),
        round: 1,
        players: state.playerIds,
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
        players: state.playerIds,
        created: new Date().toLocaleString(),
        score: defaultScore,
      };

      state.rounds.push(newRound);
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
  },
});

const selectDisplayUsers = (state: RootState) => state.game.displayUsers;
const selectAllRounds = (state: RootState) => state.game.rounds;
const selectTotalRounds = (state: RootState) => state.game.rounds.length;
const selectScoreByPlayer = createSelector(selectAllRounds, (state) =>
  calcTotalScore(state)
);

export const {
  setDisplayUsers,
  clearRounds,
  addOneRound,
  removeOneRound,
  scoreAdded,
} = gameSlice.actions;

export {
  selectDisplayUsers,
  selectAllRounds,
  selectTotalRounds,
  selectScoreByPlayer,
};