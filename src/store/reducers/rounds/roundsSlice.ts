import { createSlice } from "@reduxjs/toolkit";
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
    },
    removeOneRound: (state, action) => {
      // TODO 
      state.rounds = state.rounds.filter(
        (round) => round.roundId !== action.payload
      );
    },
    // scoreAdded: (state, action) => {},
  },
});

const selectAll = (state: RootState) => state.game.rounds;
const selectTotalRounds = (state: RootState) => state.game.rounds.length;

export const { addOneRound, removeOneRound } = roundSlice.actions;
export { selectAll, selectTotalRounds };
