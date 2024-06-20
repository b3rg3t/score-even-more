import { FaGamepad } from "react-icons/fa";
import { text } from "../../localization/eng";
import { selectAll } from "../../store/reducers/players/playersSlice";
import {
  clearRounds,
  selectScoreByPlayer,
  selectTotalRounds,
} from "../../store/reducers/rounds/roundsSlice";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";

export const ScoreBoard = () => {
  const dispatch = useAppDispatch()
  const totalRounds = useAppSelector(selectTotalRounds);
  const allPlayers = useAppSelector(selectAll);
  const totalScore = useAppSelector(selectScoreByPlayer);
  const players = [...allPlayers];

  return (
    <section className="score-board d-flex flex-column mb-3 border mt-2 rounded">
      <div className="text-white rounded p-2 shadow">
        <div className="d-flex justify-content-between align-items-center border-bottom">
          <h2 className="mb-1 d-flex pb-1">
            {text.scoreBoard.header}
            <span className="ms-1 badge rounded-pill text-bg-info text-white">
              {totalRounds}
            </span>
          </h2>
          <button className="btn btn-primary flex-column py-1 px-1 mb-1" onClick={() => dispatch(clearRounds())}>
            <FaGamepad />
            <span className="footer__text ">New game</span>
          </button>
        </div>
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
