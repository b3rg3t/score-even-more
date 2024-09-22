import Select, { MultiValue, SingleValue, components } from "react-select";
import CreatableSelect from "react-select/creatable";
import { gameTypeOptions } from "../../data/gameTypeOptions";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import {
  addPlayerId,
  selectGameType,
  selectPlayersProfile,
  setAllPlayerIds,
  setGameType,
} from "../../store/reducers/game/gameSlice";
import { TGameTypeOption } from "../../models/type/gameSettings/TGameTypeOptions";
import {
  addOnePlayer,
  selectAll,
} from "../../store/reducers/players/playersSlice";
import { ImUsers } from "react-icons/im";
import { nanoid } from "@reduxjs/toolkit";
import { TPlayer } from "../../models/type/TPlayer";
import { ActivePlayerList } from "../players/ActivePlayerList";

export const GameSettings = () => {
  const dispatch = useAppDispatch();
  const gameType = useAppSelector(selectGameType);
  const players = useAppSelector(selectAll);
  const playerIds = useAppSelector(selectPlayersProfile);

  const handleSelectGameType = (newValue: SingleValue<TGameTypeOption>) => {
    dispatch(setGameType(newValue as TGameTypeOption));
  };

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
      <label htmlFor="gameType" className="text-white">
        Type of game
      </label>
      <Select
        name="gameType"
        onChange={handleSelectGameType}
        value={gameType}
        options={gameTypeOptions}
      />

      <div className="d-flex flex-column gap-2">
        <label htmlFor="players" className="text-white">
          Game players
        </label>
        <CreatableSelect
          formatCreateLabel={(player) => {
            return `Create: ${player}`;
          }}
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
