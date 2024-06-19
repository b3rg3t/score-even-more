import { text } from "../../localization/eng";
import { ROUND } from "../../models/round";

interface IRoundItem {
  idx: number;
  round: ROUND;
}

export const RoundItem = ({ idx, round }: IRoundItem) => {
  return (
    <li className="bg-dark text-white rounded px-2 py-1">
      <div>
        <h3>{text.rounds.round}: {idx + 1}</h3>
      </div>
      {round.roundId}
    </li>
  );
};
