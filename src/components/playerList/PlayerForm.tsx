import React, { FC, useState } from "react";
import { TPlayer } from "../../models/type/players/TPlayer";
import { useDispatch } from "react-redux";
import { updateOnePlayer } from "../../store/reducers/players/playersSlice";
import { FaCheck, FaTimes } from "react-icons/fa";
import { text } from "../../localization/eng";

interface IPlayerForm extends TPlayer {
  setEditPlayer: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PlayerForm: FC<IPlayerForm> = (props) => {
  const { name, setEditPlayer } = props;
  const dispatch = useDispatch();
  const [playerName, setPlayerName] = useState<string>(name);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameInput = event.currentTarget.elements.namedItem(
      "name",
    ) as HTMLInputElement | null;

    if (!nameInput) {
      return;
    }

    dispatch(
      updateOnePlayer({
        id: props.playerId,
        changes: { name: nameInput.value },
      }),
    );
    setEditPlayer(false);
  };

  return (
    <form onSubmit={onSubmit} className="player-list__form">
      <input
        autoFocus
        className="form-control player-form__input"
        name="name"
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />

      <div className="player-list__actions">
        <button
          title={text.button.submit}
          type="submit"
          aria-label={text.button.submit}
          className="player-list__action player-list__action--edit"
        >
          <FaCheck aria-hidden="true" />
        </button>
        <button
          title={text.button.editPlayer}
          type="button"
          aria-label={text.button.editPlayer}
          className="player-list__action player-list__action--remove"
          onClick={() => setEditPlayer(false)}
        >
          <FaTimes aria-hidden="true" />
        </button>
      </div>
    </form>
  );
};
