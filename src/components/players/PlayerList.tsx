import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import { removeOnePlayer, selectAll } from "../../store/reducers/players";
import { PLAYER } from "../../models/player";

export const PlayerList = () => {
  const allPlayers = useAppSelector(selectAll);
  const dispatch = useAppDispatch();
  const handleRemovePlayer = (playerId: PLAYER["playerId"]) => {
    dispatch(removeOnePlayer(playerId));
  };
  return (
    <ul className="list-unstyled">
      {allPlayers.map((player) => (
        <li
          key={player.playerId}
          className="badge bg-danger badge-pill d-flex align-items-center justify-content-between"
        >
          {player.name}
          <button
            className="ms-2 btn btn-sm d-flex align-items-center"
            onClick={() => handleRemovePlayer(player.playerId)}
          >
            x
          </button>
        </li>
      ))}
    </ul>
  );
};
