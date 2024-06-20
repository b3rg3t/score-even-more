import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import { removeOnePlayer, selectAll } from "../../store/reducers/players/playersSlice";
import { PLAYER } from "../../models/player";
import { FaTimes } from "react-icons/fa";

export const PlayerList = () => {
  const allPlayers = useAppSelector(selectAll);
  const dispatch = useAppDispatch();
  const handleRemovePlayer = (playerId: PLAYER["playerId"]) => {
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
            className="ms-2 px-0 btn btn-sm d-flex align-items-center"
            onClick={() => handleRemovePlayer(player.playerId)}
          >
            <FaTimes/>
          </button>
        </li>
      ))}
    </ul>
  );
};
