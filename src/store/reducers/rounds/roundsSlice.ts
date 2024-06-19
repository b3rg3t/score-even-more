import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ROUND } from "../../../models/round";
import { RootState } from "../../redux/store";
import { roundsMock } from "../../../__mocks__/data/RoundsMock";

const roundsAdapter = createEntityAdapter({
  selectId: (round: ROUND) => round.roundId,
  sortComparer: (a, b) => a.roundId.localeCompare(b.roundId),
});

const initialState = roundsAdapter.getInitialState();
const filledState = roundsAdapter.upsertMany(initialState, roundsMock);

export const roundSlice = createSlice({
  name: "rounds",
  initialState: filledState,
  reducers: {
    addOneRound: roundsAdapter.addOne,
    roundsReceived(state, action) {
      roundsAdapter.setAll(state, action.payload.round);
    },
  },
});
const roundsSelectors = roundsAdapter.getSelectors<RootState>(
  (state) => state.rounds
);

export const { selectAll, selectById, selectTotal } = roundsSelectors;

export const { addOneRound } = roundSlice.actions
export { roundsSelectors };
