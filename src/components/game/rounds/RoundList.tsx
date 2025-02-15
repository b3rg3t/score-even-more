import { selectRoundsOrderByCreated } from "../../../store/reducers/game/gameSlice";
import { useAppSelector } from "../../../store/redux/hooks";
import { RoundItem } from "./RoundItem";

export const RoundList = () => {
  const rounds = useAppSelector(selectRoundsOrderByCreated);

  let roundPos = rounds.length;

  return (
    <section>
      <ul className="list-unstyled gap-2 d-flex flex-column">
        {rounds.map((round, idx) => {
          roundPos--;
          const isLatestRound = idx === 0;
          return (
            <RoundItem
              key={round}
              roundId={round}
              roundPos={roundPos}
              isLatestRound={isLatestRound}
            />
          );
        })}
      </ul>
    </section>
  );
};
