import { FaChevronDown } from "react-icons/fa";
import { text } from "../../../localization/eng";
import {
  selectScoreboardOpen,
  selectScoreByPlayer,
  selectTotalRounds,
} from "../../../store/reducers/game/gameSlice";
import { useAppSelector } from "../../../store/redux/hooks";
import { ScoreboardPlayer } from "./ScoreboardPlayer";
import { FC } from "react";

interface IScoreboard {
  className: string;
}

export const Scoreboard: FC<IScoreboard> = ({ className }) => {
  const isOpen = useAppSelector(selectScoreboardOpen);
  const totalRounds = useAppSelector(selectTotalRounds);
  const players = useAppSelector(selectScoreByPlayer);

  return (
    <section
      className={`bg-dark d-flex flex-column mb-2 border mt-2 rounded ${className}`}
    >
      <details
        id="scoreboard-accordion"
        className="d-flex flex-column text-white"
        open={!!isOpen}
      >
        <summary className="d-flex justify-content-between align-items-center rounded p-2 shadow flex-grow-1">
          <h2 className="d-flex display-3 fw-bold mb-0">
            {text.scoreBoard.header}
          </h2>
          <div className="d-flex align-items-center gap-2">
            <span className="ms-1 badge rounded-pill text-bg-info text-white display-4">
              {text.scoreBoard.rounds}
              {totalRounds}
            </span>
            <div className="p-1">
              <div
                className="d-flex justify-content-center align-items-center"
        
              >
                <FaChevronDown className="rotate" />
              </div>
            </div>
          </div>
        </summary>
        <ul className="border-top list-unstyled d-flex flex-column gap-1 mt-1 flex-wrap p-2 mb-0">
          {players.map((player) => (
            <ScoreboardPlayer key={player.playerId} player={player} />
          ))}
        </ul>
      </details>
    </section>
  );
};
