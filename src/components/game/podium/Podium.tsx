import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import {
  selectSortedScoreByPlayer,
  setGameFinished,
} from "../../../store/reducers/game/gameSlice";
import { FaTrophy } from "react-icons/fa6";
import { FaTimesCircle } from "react-icons/fa";
import { text } from "../../../localization/eng";
import { PositionList } from "../positionList/PositionList";
import { GameGraph } from "../gameGraph/GameGraph";
import "./podium.scss";

type PlayerScore = {
  position: number;
  name: string | undefined;
  playerId: string;
  totalScore: number;
};

export const Podium = () => {
  const dispatch = useAppDispatch();
  const playerScore = useAppSelector(selectSortedScoreByPlayer);

  const topPlayers: PlayerScore[] = [
    playerScore[1],
    playerScore[0],
    playerScore[2],
  ];

  return (
    <section className="podium-card mx-2 mt-2 overflow-hidden rounded-3 border bg-body shadow-sm">
      <header className="bg-subtle d-flex align-items-center justify-content-between px-3 py-2">
        <h2 className="fs-6 fw-semibold text-dark mb-0">
          {text.result.header}
        </h2>
        <button
          type="button"
          title={text.button.finish}
          aria-label={text.button.finish}
          className="btn btn-sm btn-light border-0 text-secondary"
          onClick={() => dispatch(setGameFinished())}
        >
          <FaTimesCircle />
        </button>
      </header>
      <ul className="podium__stage d-flex align-items-end justify-content-center gap-2 gap-sm-3 list-unstyled">
        <li className="podium__fireworks" aria-hidden="true">
          <span className="podium__firework podium__firework--left" />
          <span className="podium__firework podium__firework--center" />
          <span className="podium__firework podium__firework--right" />
        </li>
        {topPlayers.map((player, idx) => {
          if (idx === 0 && player) {
            return (
              <li
                className="podium__place podium__place--second"
                key={player.playerId}
              >
                <span className="podium__name">{player.name}</span>
                <div className="podium__step">
                  <span className="podium__rank">2</span>
                </div>
              </li>
            );
          } else if (idx === 1 && player) {
            return (
              <li
                className="podium__place podium__place--first"
                key={player.playerId}
              >
                <div className="podium__winner">
                  <FaTrophy className="podium__trophy" aria-hidden="true" />
                  <span className="podium__name">{player.name}</span>
                </div>
                <div className="podium__step">
                  <span className="podium__rank">1</span>
                </div>
              </li>
            );
          } else if (idx === 2 && player) {
            return (
              <li
                className="podium__place podium__place--third"
                key={player.playerId}
              >
                <span className="podium__name">{player.name}</span>
                <div className="podium__step">
                  <span className="podium__rank">3</span>
                </div>
              </li>
            );
          }
          return null;
        })}
      </ul>
      <PositionList />
      <GameGraph />
    </section>
  );
};
