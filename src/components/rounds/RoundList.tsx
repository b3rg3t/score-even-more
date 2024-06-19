import { selectAll, selectTotal } from "../../store/reducers/rounds";
import { useAppSelector } from "../../store/redux/hooks";

export const RoundList = () => {
  const rounds = useAppSelector(selectAll);
  const totalRounds = useAppSelector(selectTotal)
  return (
    <>
    <p>Rounds: {totalRounds}</p>
      <ul className="list-unstyled">
        {rounds.map((round) => (
          <li key={round.roundId}>{round.roundId}</li>
        ))}
      </ul>
    </>
  );
};
