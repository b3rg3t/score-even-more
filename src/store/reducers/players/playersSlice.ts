import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { TPlayer } from "../../../models/type/TPlayer";
import { playersMock } from "../../../__mocks__/data/PlayersMock";

const playersAdapter = createEntityAdapter({
  selectId: (player: TPlayer) => player.playerId,
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
    // TODO: not in use
    roundsReceived(state, action) {
      // Or, call them as "mutating" helpers in a case reducer
      playersAdapter.setAll(state, action.payload.round);
    },
  },
});

const selectAllPlayers = playersAdapter.getSelectors<RootState>(
  (state) => state.players
);
const selectAllEntities = selectAllPlayers.selectEntities;
export const { selectAll, selectById, selectTotal } = selectAllPlayers;

export const { addOnePlayer, removeOnePlayer } = playersSlice.actions;
export { selectAllPlayers, selectAllEntities };
