import {
  selectAllRounds,
} from "../../../store/reducers/game/gameSlice";
import { useAppSelector } from "../../../store/redux/hooks";
import { RoundItem } from "./RoundItem";

export const RoundList = () => {
  const rounds = useAppSelector(selectAllRounds);
  const allRounds = [...rounds];

  const orderByCreated = allRounds.sort((a, b) => {
    const dateA = new Date(a.created);
    const dateB = new Date(b.created);

    return dateA < dateB ? 1 : dateA > dateB ? -1 : 0
  });

  let roundPos = rounds.length;

  return (
    <section>
      <ul className="list-unstyled gap-2 d-flex flex-column">
        {orderByCreated.map((round) => {
          roundPos--;
          return (
            <RoundItem key={round.roundId} round={round} roundPos={roundPos} />
          );
        })}
      </ul>
    </section>
  );
};
