import { PayloadAction, createSelector, createSlice, nanoid } from "@reduxjs/toolkit";
import { roundsMock } from "../../../__mocks__/data/RoundsMock";
import { RootState } from "../../redux/store";
import { ROUND } from "../../../models/round";
import { calcTotalScore } from "./helper";

interface IInitialState {
  playerIds: string[];
  rounds: ROUND[];
}

const initialState: IInitialState = {
  playerIds: roundsMock[0].players,
  rounds: roundsMock,
};

export const roundSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    addOneRound: (state, _action: PayloadAction<undefined>) => {
      const defaultScore: any = {};
      for (const player of state.playerIds) {
        defaultScore[player] = 0;
      }

      const newRound: ROUND = {
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

const selectAllRounds = (state: RootState) => state.game.rounds;
const selectTotalRounds = (state: RootState) => state.game.rounds.length;
const selectScoreByPlayer = createSelector(selectAllRounds,(state) => calcTotalScore(state))

export const { addOneRound, removeOneRound, scoreAdded } = roundSlice.actions;
export { selectAllRounds, selectTotalRounds, selectScoreByPlayer };
