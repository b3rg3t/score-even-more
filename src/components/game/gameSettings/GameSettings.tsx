import { MultiValue, components } from "react-select";
import CreatableSelect from "react-select/creatable";
import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import {
  addPlayerId,
  selectPlayersProfile,
  setAllPlayerIds,
} from "../../../store/reducers/game/gameSlice";
import {
  addOnePlayer,
  selectAll,
} from "../../../store/reducers/players/playersSlice";
import { ImUsers } from "react-icons/im";
import { nanoid } from "@reduxjs/toolkit";
import { TPlayer } from "../../../models/type/TPlayer";
import { ActivePlayerList } from "../../players/ActivePlayerList";

export const GameSettings = () => {
  const dispatch = useAppDispatch();
  const players = useAppSelector(selectAll);
  const playerIds = useAppSelector(selectPlayersProfile);

  const MultiValueContainer = (props: any) => (
    <components.MultiValueContainer {...props}>
      <span className="d-flex align-items-center px-1 rounded">
        <ImUsers className="mr-1" />
        {playerIds.length}
      </span>
    </components.MultiValueContainer>
  );

  const handleCreateOption = (inputValue: string) => {
    const newPlayer: TPlayer = { playerId: nanoid(), name: inputValue };

    dispatch(addPlayerId(newPlayer));
    dispatch(addOnePlayer(newPlayer));
  };

  const handlePlayerOnChange = (newValue: MultiValue<TPlayer>) => {
    dispatch(setAllPlayerIds(newValue as TPlayer[]));
  };

  return (
    <section className="d-flex flex-column gap-2">
      <div className="d-flex flex-column gap-2">
        <label htmlFor="players" className="text-white">
          Game players
        </label>
        <CreatableSelect
          formatCreateLabel={(player) => `Create: ${player}`}
          name="players"
          classNamePrefix="select-player"
          options={players}
          isMulti
          onChange={handlePlayerOnChange}
          getOptionLabel={(player) => player.name ?? player.label}
          getOptionValue={(player) => player.playerId ?? player.value}
          onCreateOption={handleCreateOption}
          value={playerIds}
          components={{ MultiValueContainer }}
          isClearable={false}
        />
        <ActivePlayerList />
      </div>
    </section>
  );
};
