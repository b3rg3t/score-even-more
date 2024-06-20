import { selectAll } from "../../store/reducers/players/playersSlice";
import { selectScoreByPlayer } from "../../store/reducers/rounds/roundsSlice";
import { useAppSelector } from "../../store/redux/hooks";

export const ScoreBoard = () => {
  const allPlayers = useAppSelector(selectAll);
  const totalScore = useAppSelector(selectScoreByPlayer);
  const players = [...allPlayers];

  return (
    <section className="d-flex flex-column mb-2">
      <div className="bg-dark text-white rounded p-2 shadow">
        <h2 className="mb-1 border-bottom">ScoreBoard</h2>
        <ul className="list-unstyled mb-0">
          {players.map((player) => (
            <li key={player.playerId}>
              {player.name}: {totalScore[player.playerId]}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
