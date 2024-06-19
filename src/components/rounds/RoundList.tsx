import {
  selectAll,
  selectTotal,
} from "../../store/reducers/rounds/roundsSlice";
import { useAppSelector } from "../../store/redux/hooks";
import { RoundItem } from "./RoundItem";

export const RoundList = () => {
  const rounds = useAppSelector(selectAll);
  const totalRounds = useAppSelector(selectTotal);
  return (
    <section>
      <p>Rounds: {totalRounds}</p>
      <ul className="list-unstyled gap-2 d-flex flex-column">
        {rounds.map((round, idx) => (
          <RoundItem key={round.roundId} round={round} idx={idx} />
        ))}
      </ul>
    </section>
  );
};
