import { FaFlagCheckered } from "react-icons/fa6";
import { text } from "../../../localization/eng";
import {
  selectScoreByPlayer,
  selectTotalRounds,
  setGameFinished,
} from "../../../store/reducers/game/gameSlice";
import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import { ScoreBoardPlayer } from "./ScoreBoardPlayer";

export const ScoreBoard = () => {
  const dispatch = useAppDispatch();
  const totalRounds = useAppSelector(selectTotalRounds);
  const players = useAppSelector(selectScoreByPlayer);

  return (
    <section className="bg-dark d-flex flex-column mb-3 border mt-2 rounded">
      <div className="text-white rounded p-2 shadow">
        <div className="d-flex justify-content-between align-items-center border-bottom mb-1 pb-1">
          <div className="d-flex align-items-center">
            <h2 className="d-flex display-2 fw-bold mb-0">
              {text.scoreBoard.header}
            </h2>
            <span className="ms-1 badge rounded-pill text-bg-info text-white display-4">
              {text.scoreBoard.rounds}
              {totalRounds}
            </span>
          </div>
          <button
            title={text.button.finish}
            className="btn btn-outline-info text-white py-1 mb-1"
            onClick={() => dispatch(setGameFinished())}
          >
            <FaFlagCheckered />
          </button>
        </div>
        <ul className="list-unstyled d-flex flex-column gap-1 mt-1 flex-wrap">
          {players.map((player) => (
            <ScoreBoardPlayer key={player.playerId} player={player} />
          ))}
        </ul>
      </div>
    </section>
  );
};
