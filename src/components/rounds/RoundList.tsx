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
    <>
      <p>Rounds: {totalRounds}</p>
      <ul className="list-unstyled">
        {rounds.map((round, idx) => (
          <RoundItem key={round.roundId} round={round} idx={idx} />
        ))}
      </ul>
    </>
  );
};
