import { selectRoundsOrderByCreatedASC } from "../../../store/reducers/game/gameSlice";
import { useAppSelector } from "../../../store/redux/hooks";
import { RoundItem } from "./RoundItem";

export const RoundList = () => {
  const rounds = useAppSelector(selectRoundsOrderByCreatedASC);

  let roundPos = rounds.length;

  return (
    <section className="px-2">
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
