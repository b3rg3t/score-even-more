import {
  Control,
  Controller,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { ECreateGameForm } from "../../../models/enum/ECreateGameForm";
import { useAppSelector } from "../../../store/redux/hooks";
import { selectAll } from "../../../store/reducers/players/playersSlice";
import { FC, useState, type ReactNode } from "react";
import { TPlayer } from "../../../models/type/players/TPlayer";
import { GroupBase, ValueContainerProps, components } from "react-select";
import { ImUsers } from "react-icons/im";
import { ICreateGameExtended } from "../../../models/interface/ICreateGame";
import { formatString } from "../../../helpers/stringFormat";
import { text } from "../../../localization/eng";
import { ActivePlayerList } from "../../players/ActivePlayerList";
import { useGame } from "../../../hooks/UseRound";

const { placeholder, createPlayer } = text.gameSettings.createSelect;

interface ISelectPlayer {
  control: Control<ICreateGameExtended>;
  playerValues?: TPlayer[];
  getValues: UseFormGetValues<ICreateGameExtended>;
  setValue: UseFormSetValue<ICreateGameExtended>;
}

export const SelectPlayers: FC<ISelectPlayer> = ({
  control,
  playerValues,
  getValues,
  setValue,
}) => {
  const { newPlayer } = useGame();
  const players = useAppSelector(selectAll);
  const [playersOption, setPlayersOptions] = useState<TPlayer[]>(players);

  const prevValues = getValues(ECreateGameForm.PLAYERS);

  const handleCreateOption = (inputValue: string) => {
    const player = newPlayer(inputValue);

    setPlayersOptions((prevState) => [player, ...prevState]);
    setValue(
      ECreateGameForm.PLAYERS,
      prevValues ? [player, ...prevValues] : [player],
    );
  };

  const handleRemoveValue = (playerId: TPlayer["playerId"]) => {
    setValue(
      ECreateGameForm.PLAYERS,
      prevValues?.filter((player) => player.playerId !== playerId),
    );
  };

  const ValueContainer = (
    props: ValueContainerProps<TPlayer, true, GroupBase<TPlayer>>,
  ): ReactNode => {
    const { children, getValue, ...restProps } = props;
    const selectedCount = playerValues?.length ?? getValue().length;

    return components.ValueContainer({
      ...restProps,
      getValue,
      children:
        selectedCount > 0 ? (
          <>
            <span className="d-flex align-items-center px-1 rounded">
              <ImUsers className="mr-1" />
              {selectedCount}
            </span>
            {children}
          </>
        ) : (
          props.children
        ),
    }) as ReactNode;
  };

  return (
    <>
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
            className="form-width mb-2"
            formatCreateLabel={(player) => {
              return formatString(createPlayer, player);
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
            components={{ ValueContainer }}
            isClearable={true}
            placeholder={placeholder}
            {...other}
          />
        )}
      />
      <ActivePlayerList
        playerList={prevValues ?? []}
        onRemovePlayer={handleRemoveValue}
      />
    </>
  );
};
