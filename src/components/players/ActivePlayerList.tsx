import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import { removePlayerId, selectPlayersProfile } from "../../store/reducers/game/gameSlice";
import { FaTimes } from "react-icons/fa";
import { TPlayer } from "../../models/type/TPlayer";


export const ActivePlayerList = () => {
  const players = useAppSelector(selectPlayersProfile);
  const dispatch = useAppDispatch();

  const handleRemovePlayer = (playerId: TPlayer["playerId"]) => {
    dispatch(removePlayerId(playerId));
  };

  return (
    <ul className="list-unstyled d-flex flex-wrap gap-1">
      {players.map((player) => (
        <li
          key={player.playerId}
          className="d-flex ps-2 pe-1 py-1 rounded bg-black text-white gap-1"
        >
          {player.name}
          <button
            className="btn btn-sm text-white"
            onClick={() => handleRemovePlayer(player.playerId)}
          >
            <FaTimes />
          </button>
        </li>
      ))}
    </ul>
  );
};
