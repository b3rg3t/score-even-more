import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ROUND } from "../../models/round";
import { RootState } from "../redux/store";

const roundAdapter = createEntityAdapter({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (round: ROUND) => round.roundId,
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.roundId.localeCompare(b.roundId),
});

export const roundSlice = createSlice({
  name: "round",
  initialState: roundAdapter.getInitialState(),
  reducers: {
    addOneRound: roundAdapter.addOne,
    roundsReceived(state, action) {
      // Or, call them as "mutating" helpers in a case reducer
      roundAdapter.setAll(state, action.payload.round);
    },
  },
});

// export const { addOne, addMany, updateOne, removeOne } = roundAdapter;
// Can create a set of memoized selectors based on the location of this entity state
const roundsSelectors = roundAdapter.getSelectors<RootState>(
  (state) => state.round
);

export const { selectAll, selectById, selectTotal } = roundsSelectors;

export const { addOneRound } = roundSlice.actions
export { roundsSelectors };
// And then use the selectors to retrieve values
// const allRounds = roundsSelectors.selectAll(store.getState());

// export { allRounds };
