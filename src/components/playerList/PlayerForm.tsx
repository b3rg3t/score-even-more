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

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // @ts-ignore
    const { name } = event.currentTarget;

    dispatch(
      updateOnePlayer({ id: props.playerId, changes: { name: name.value } })
    );
    setEditPlayer(false);
  };

  return (
    <form onSubmit={onSubmit} className="w-100 d-flex  gap-2">
      <input
        className="form-control px-1 rounded-0 border-0"
        name="name"
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        style={{
          height: "24px",
        }}
      />

      <div className="d-flex gap-2">
        <button
          title={text.button.submit}
          type="submit"
          className="btn btn-outline-success btn-sm"
        >
          <FaCheck />
        </button>
        <button
          title={text.button.editPlayer}
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={() => setEditPlayer(false)}
        >
          <FaTimes />
        </button>
      </div>
    </form>
  );
};
