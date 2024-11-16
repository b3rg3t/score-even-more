import { FaTrashAlt } from "react-icons/fa";
import { TRound } from "../../../models/type/TRound";
import { removeOneRound, selectPlayersProfile } from "../../../store/reducers/game/gameSlice";
import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import { RoundForm } from "./RoundForm";

interface IRoundItem {
  roundPos: number;
  round: TRound;
}

export const RoundItem = ({ roundPos, round }: IRoundItem) => {
  const dispatch = useAppDispatch();
  const players = useAppSelector(selectPlayersProfile);

  const handleRemoveRound = () => {
    dispatch(removeOneRound(round.roundId));
  };

  return (
    <li className="border rounded px-1 py-1 bg-light-subtle shadow">
      <div className="d-flex mb-1">
        <span className="badge rounded-pill text-bg-info text-white">{roundPos + 1}</span>
        <button className="btn py-0 px-1 d-flex text-danger" onClick={handleRemoveRound}>
          <FaTrashAlt />
        </button>
      </div>
      <ul className="list-unstyled gap-1 d-flex flex-column">
        {players.map((player) => (
          <RoundForm
            key={player.playerId}
            roundId={round.roundId}
            player={player}
          />
        ))}
      </ul>
    </li>
  );
};
