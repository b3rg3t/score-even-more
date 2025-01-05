import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import {
  removeOnePlayer,
  selectAll,
} from "../../store/reducers/players/playersSlice";
import { TPlayer } from "../../models/type/TPlayer";
import { FaTimes } from "react-icons/fa";
import { text } from "../../localization/eng";

export const PlayerListChip = () => {
  const allPlayers = useAppSelector(selectAll);
  const dispatch = useAppDispatch();
  const handleRemovePlayer = (playerId: TPlayer["playerId"]) => {
    dispatch(removeOnePlayer(playerId));
  };
  return (
    <ul className="list-unstyled d-flex gap-2 p-1 border rounded flex-wrap bg-info-subtle w-100 border">
      {allPlayers.map((player) => (
        <li
          key={player.playerId}
          className="badge text-bg-secondary badge-pill d-flex align-items-center justify-content-between"
        >
          <span className="me-2">{player.name}</span>
          <button
            title={text.button.removePlayer}
            className="ms-2 px-0 btn btn-sm d-flex align-items-center"
            onClick={() => handleRemovePlayer(player.playerId)}
          >
            <FaTimes />
          </button>
        </li>
      ))}
    </ul>
  );
};
