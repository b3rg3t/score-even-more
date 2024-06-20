import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { roundsMock } from "../../../__mocks__/data/RoundsMock";
import { RootState } from "../../redux/store";
import { ROUND } from "../../../models/round";

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
    addOneRound: (state, action) => {
      // TODO
      // @ts-ignore
      state.rounds.push(action.payload);
      //   prepare(title, content, userId) {
      //     return {
      //         payload: {
      //             id: nanoid(),
      //             title,
      //             content,
      //             date: new Date().toISOString(),
      //             userId,
      //             reactions: {
      //                 thumbsUp: 0,
      //                 wow: 0,
      //                 heart: 0,
      //                 rocket: 0,
      //                 coffee: 0
      //             }
      //         }
      //     }
      // }
    },
    removeOneRound: (state, action) => {
      // TODO
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
            [action.payload.score.player]: existingScore.score?.[action.payload.score.player] + action.payload.score.score,
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

const selectAll = (state: RootState) => state.game.rounds;
const selectTotalRounds = (state: RootState) => state.game.rounds.length;

export const { addOneRound, removeOneRound, scoreAdded } = roundSlice.actions;
export { selectAll, selectTotalRounds };
