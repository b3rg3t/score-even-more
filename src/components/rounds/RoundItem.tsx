import { FaTrashAlt } from "react-icons/fa";
import { ROUND } from "../../models/round";
import { removeOneRound } from "../../store/reducers/rounds/roundsSlice";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import { selectAll } from "../../store/reducers/players/playersSlice";
import { RoundForm } from "./RoundForm";

interface IRoundItem {
  roundPos: number;
  round: ROUND;
}

export const RoundItem = ({ roundPos, round }: IRoundItem) => {
  const dispatch = useAppDispatch();
  const players = useAppSelector(selectAll);

  const handleRemoveRound = () => {
    dispatch(removeOneRound(round.roundId));
  };

  return (
    <li className="border rounded px-1 py-1 bg-info-subtle">
      <div className="d-flex justify-content-between mb-1">
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
