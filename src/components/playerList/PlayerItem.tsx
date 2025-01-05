import { FC, useState } from "react";
import { TPlayer } from "../../models/type/TPlayer";
import { UserImage } from "../shared/UserImage";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { PlayerForm } from "./PlayerForm";
import { useAppDispatch } from "../../store/redux/hooks";
import { removeOnePlayer } from "../../store/reducers/players/playersSlice";
import { text } from "../../localization/eng";

export const PlayerItem: FC<TPlayer> = (props) => {
  const dispatch = useAppDispatch();
  const [editPlayer, setEditPlayer] = useState<boolean>(false);

  const handleRemovePlayer = () => {
    dispatch(removeOnePlayer(props.playerId));
  };

  return (
    <li className="d-flex align-items-center border rounded px-2 bg-dark py-2">
      <UserImage size={20} />
      {editPlayer ? (
        <div className="d-flex justify-content-between w-100">
          <PlayerForm {...props} setEditPlayer={setEditPlayer} />
        </div>
      ) : (
        <div className="d-flex justify-content-between w-100">
          <span className="text-white px-1">{props.name}</span>
          <div className="d-flex gap-2">
            <button
              title={text.button.editPlayer}
              className="btn btn-secondary btn-sm text-white"
              onClick={() => setEditPlayer(true)}
            >
              <FaEdit />
            </button>
            <button
              title={text.button.removePlayer}
              disabled
              className="btn btn-danger btn-sm"
              onClick={() => handleRemovePlayer()}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      )}
    </li>
  );
};
