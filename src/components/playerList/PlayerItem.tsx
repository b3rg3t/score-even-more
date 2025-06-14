import { FC, useState } from "react";
import { TPlayer } from "../../models/type/players/TPlayer";
import { UserImage } from "../shared/UserImage";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { PlayerForm } from "./PlayerForm";
import { useAppDispatch } from "../../store/redux/hooks";
import { text } from "../../localization/eng";
import { setDeletePlayer } from "../../store/reducers/game/gameSlice";

export const PlayerItem: FC<TPlayer> = (props) => {
  const { playerId, name, icon } = props;
  const dispatch = useAppDispatch();
  const [editPlayer, setEditPlayer] = useState<boolean>(false);

  const handleRemovePlayer = () => {
    dispatch(setDeletePlayer(playerId));
  };

  return (
    <li className="d-flex align-items-center border rounded px-2 bg-dark py-2">
      <UserImage size={20} icon={icon} />
      {editPlayer ? (
        <div className="d-flex justify-content-between w-100">
          <PlayerForm {...props} setEditPlayer={setEditPlayer} />
        </div>
      ) : (
        <div className="d-flex justify-content-between w-100">
          <span className="text-white px-1">{name}</span>
          <div className="d-flex gap-2">
            <button
              title={text.button.editPlayer}
              className="btn btn-primary btn-sm text-white"
              onClick={() => setEditPlayer(true)}
            >
              <FaEdit />
            </button>
            <button
              title={text.button.removePlayer}
              className="btn btn-outline-danger btn-sm text-white"
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
