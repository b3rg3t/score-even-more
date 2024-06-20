import { text } from "../../localization/eng";
import { selectAll } from "../../store/reducers/players/playersSlice";
import {
  selectScoreByPlayer,
  selectTotalRounds,
} from "../../store/reducers/rounds/roundsSlice";
import { useAppSelector } from "../../store/redux/hooks";

export const ScoreBoard = () => {
  const totalRounds = useAppSelector(selectTotalRounds);
  const allPlayers = useAppSelector(selectAll);
  const totalScore = useAppSelector(selectScoreByPlayer);
  const players = [...allPlayers];

  return (
    <section className="score-board d-flex flex-column mb-3 border mt-2 rounded">
      <div className="text-white rounded p-2 shadow">
        <h2 className="mb-1 border-bottom d-flex justify-content-between pb-1">
          {text.scoreBoard.header}
          <span className="badge rounded-pill text-bg-info text-white">
            {totalRounds}
          </span>
        </h2>
        <ul className="list-unstyled">
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
