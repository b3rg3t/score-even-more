import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";
import { PLAYER } from "../../models/player";

const playersAdapter = createEntityAdapter({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (player: PLAYER) => player.playerId,
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.playerId.localeCompare(b.playerId),
});

export const playersSlice = createSlice({
  name: "players",
  initialState: playersAdapter.getInitialState(),
  reducers: {
    addOnePlayer: playersAdapter.addOne,
    removeOnePlayer: playersAdapter.removeOne,
    roundsReceived(state, action) {
      // Or, call them as "mutating" helpers in a case reducer
      playersAdapter.setAll(state, action.payload.round);
    },
  },
});

// export const { addOne, addMany, updateOne, removeOne } = roundAdapter;
// Can create a set of memoized selectors based on the location of this entity state
const playersSelectors = playersAdapter.getSelectors<RootState>(
  (state) => state.players
);

export const { selectAll, selectById, selectTotal } = playersSelectors;

export const { addOnePlayer, removeOnePlayer } = playersSlice.actions
export { playersSelectors as roundsSelectors };
// And then use the selectors to retrieve values
// const allRounds = roundsSelectors.selectAll(store.getState());

// export { allRounds };
