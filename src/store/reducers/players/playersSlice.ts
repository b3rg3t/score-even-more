import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { PLAYER } from "../../../models/type/TPlayer";
import { playersMock } from "../../../__mocks__/data/PlayersMock";

const playersAdapter = createEntityAdapter({
  selectId: (player: PLAYER) => player.playerId,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = playersAdapter.getInitialState();
const filledState = playersAdapter.upsertMany(initialState, playersMock);

export const playersSlice = createSlice({
  name: "players",
  initialState: filledState,
  reducers: {
    addOnePlayer: playersAdapter.addOne,
    removeOnePlayer: playersAdapter.removeOne,
    roundsReceived(state, action) {
      // Or, call them as "mutating" helpers in a case reducer
      playersAdapter.setAll(state, action.payload.round);
    },
  },
});

const playersSelectors = playersAdapter.getSelectors<RootState>(
  (state) => state.players
);

export const { selectAll, selectById, selectTotal } = playersSelectors;

export const { addOnePlayer, removeOnePlayer } = playersSlice.actions;
export { playersSelectors };
