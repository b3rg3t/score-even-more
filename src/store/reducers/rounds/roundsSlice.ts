import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ROUND } from "../../../models/round";
import { RootState } from "../../redux/store";
import { roundsMock } from "../../../__mocks__/data/RoundsMock";

const roundsAdapter = createEntityAdapter({
  selectId: (round: ROUND) => round.roundId,
  sortComparer: (a, b) => b.roundId.localeCompare(a.roundId),
});

const initialState = roundsAdapter.getInitialState({
  playerIds: roundsMock[0].players,
});
const filledState = roundsAdapter.upsertMany(initialState, roundsMock);

export const roundSlice = createSlice({
  name: "rounds",
  initialState: filledState,
  reducers: {
    addOneRound: roundsAdapter.addOne,
    removeOneRound: roundsAdapter.removeOne,
    scoreAdded: roundsAdapter.updateOne,
    // scoreAdded(state, action) {
    //   const { roundId, score } = action.payload;
    //   const existingRound = state.rounds.find(
    //     (round: ROUND) => round.roundId === roundId
    //   );
    //   if (existingRound) {
    //     existingRound.score[score]++;
    //   }
    // },
    roundsReceived(state, action) {
      roundsAdapter.setAll(state, action.payload.round);
    },
  },
});
const roundsSelectors = roundsAdapter.getSelectors<RootState>(
  (state) => state.rounds
);

export const { selectAll, selectById, selectTotal } = roundsSelectors;

export const { addOneRound, removeOneRound, scoreAdded } = roundSlice.actions;
export { roundsSelectors };
