import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { TPlayer } from "../../../models/type/TPlayer";
import { playersMock } from "../../../__mocks__/data/PlayersMock";
import { EStoreKeys } from "../../../models/enum/EStoreKeys";
import { createGameAction } from "../combinedAction";

const playersAdapter = createEntityAdapter({
  selectId: (player: TPlayer) => player.playerId,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = playersAdapter.getInitialState();
export const filledPlayerState = playersAdapter.upsertMany(
  initialState,
  playersMock
);

export const playersSlice = createSlice({
  name: EStoreKeys.PLAYERS,
  initialState: filledPlayerState,
  reducers: {
    addOnePlayer: playersAdapter.addOne,
    updateOnePlayer: playersAdapter.updateOne,
    removeOnePlayer: playersAdapter.removeOne,
    // TODO: not in use
    roundsReceived(state, action) {
      // Or, call them as "mutating" helpers in a case reducer
      playersAdapter.setAll(state, action.payload.round);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createGameAction, (state, action) => {
      if (action.payload.players) {
        playersAdapter.addMany(state, action.payload.players);
      }
    });
  },
});

const selectAllPlayers = playersAdapter.getSelectors<RootState>(
  (state) => state.players
);
const selectAllEntities = selectAllPlayers.selectEntities;
export const { selectAll, selectById, selectTotal, selectIds } = selectAllPlayers;

export const { addOnePlayer, removeOnePlayer, updateOnePlayer } =
  playersSlice.actions;
export { selectAllPlayers, selectAllEntities };
