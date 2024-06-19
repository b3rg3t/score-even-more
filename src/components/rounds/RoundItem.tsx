import { FaTrashAlt } from "react-icons/fa";
import { text } from "../../localization/eng";
import { ROUND } from "../../models/round";
import { removeOneRound } from "../../store/reducers/rounds/roundsSlice";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import { selectAll } from "../../store/reducers/players/playersSlice";
import { RoundForm } from "./RoundForm";

interface IRoundItem {
  idx: number;
  round: ROUND;
}

export const RoundItem = ({ idx, round }: IRoundItem) => {
  const dispatch = useAppDispatch();
  const players = useAppSelector(selectAll);

  const handleRemoveRound = () => {
    dispatch(removeOneRound(round.roundId));
  };

  return (
    <li className="border rounded px-2 py-1">
      <div className="d-flex justify-content-between">
        <h3>
          {text.rounds.round}: {idx + 1} ({round.roundId})
        </h3>
        <button className="btn py-0 px-1 d-flex" onClick={handleRemoveRound}>
          <FaTrashAlt />
        </button>
      </div>
      <ul className="list-unstyled gap-1 d-flex flex-column mb-2">
        {players.map((player) => (
          <RoundForm
            key={player.playerId}
            roundId={round.roundId}
            player={player}
          />
        ))}
      </ul>
      <div className="d-flex justify-content-end">
        <button className="btn btn-outline-dark">
          {text.rounds.nextRoundButton}
        </button>
      </div>
    </li>
  );
};
