import { Control, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { ECreateGameForm } from "../../../models/enum/ECreateGameForm";
import { useAppSelector } from "../../../store/redux/hooks";
import { selectAll } from "../../../store/reducers/players/playersSlice";
import { FC, useState } from "react";
import { TPlayer } from "../../../models/type/TPlayer";
import { components } from "react-select";
import { ImUsers } from "react-icons/im";
import { nanoid } from "@reduxjs/toolkit";
import { ICreateGame } from "../../../models/interface/ICreateGame";
import { formatString } from "../../../helpers/stringFormat";
import { text } from "../../../localization/eng";

interface ISelectPlayer {
  control: Control<ICreateGame, any>;
  playerValues?: TPlayer[];
}

export const SelectPlayers: FC<ISelectPlayer> = ({ control, playerValues }) => {
  const players = useAppSelector(selectAll);
  const [playersOption, setPlayersOptions] = useState<TPlayer[]>(players);

  const handleCreateOption = (inputValue: string) => {
    const newPlayer: TPlayer = { playerId: nanoid(), name: inputValue };
    setPlayersOptions((prevState) => [newPlayer, ...prevState]);
  };

  const MultiValueContainer = (props: any) => (
    <components.MultiValueContainer {...props}>
      <span className="d-flex align-items-center px-1 rounded">
        <ImUsers className="mr-1" />
        {playerValues?.length ?? 0}
      </span>
    </components.MultiValueContainer>
  );

  return (
    <Controller
      name={ECreateGameForm.PLAYERS}
      control={control}
      rules={{
        validate: (values) =>
          (values && values?.length >= 2) ||
          formatString(text.formValidation.numberOfPlayers, "2"),
      }}
      render={({ field: { onChange, name, ref, ...other } }) => (
        <CreatableSelect
          className="form-width"
          formatCreateLabel={(player) => {
            return `Create: ${player}`;
          }}
          ref={ref}
          name={name}
          classNamePrefix="select-player"
          options={playersOption}
          isMulti
          onChange={onChange}
          getOptionLabel={(player) => player.name ?? player.label}
          getOptionValue={(player) => player.playerId ?? player.value}
          onCreateOption={handleCreateOption}
          components={{ MultiValueContainer }}
          isClearable={true}
          placeholder="Select or Create..."
          {...other}
        />
      )}
    />
  );
};
