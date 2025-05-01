import { MultiValue, components } from "react-select";
import CreatableSelect from "react-select/creatable";
import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import {
  addPlayerId,
  removePlayerId,
  selectPlayersProfile,
  setAllPlayerIds,
} from "../../../store/reducers/game/gameSlice";
import {
  addOnePlayer,
  selectAll,
} from "../../../store/reducers/players/playersSlice";
import { ImUsers } from "react-icons/im";
import { TPlayer } from "../../../models/type/players/TPlayer";
import { ActivePlayerList } from "../../players/ActivePlayerList";
import { text } from "../../../localization/eng";
import { EditGameSettings } from "./EditGameSettings";
import { useGame } from "../../../hooks/UseRound";
import { Divider } from "../../divider/Divider";

export const GameSettings = () => {
  const { newPlayer } = useGame();
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
    const player = newPlayer(inputValue);

    dispatch(addPlayerId(player));
    dispatch(addOnePlayer(player));
  };

  const handlePlayerOnChange = (newValue: MultiValue<TPlayer>) => {
    dispatch(setAllPlayerIds(newValue as TPlayer[]));
  };

  const handleRemovePlayer = (playerId: TPlayer["playerId"]) => {
    dispatch(removePlayerId(playerId));
  };

  return (
    <section className="d-flex flex-column">
      <div className="d-flex flex-column">
        <label htmlFor="players" className="text-white">
          {text.gameSettings.playerGame}
        </label>
        <CreatableSelect
          formatCreateLabel={(player) => `Create: ${player}`}
          name="players"
          classNamePrefix="select-player"
          className="mb-2"
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
        <ActivePlayerList
          playerList={playerIds}
          onRemovePlayer={handleRemovePlayer}
        />
        <Divider />
      </div>
      <EditGameSettings />
    </section>
  );
};
