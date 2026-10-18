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
      className={`bg-body border d-flex flex-column mb-3 mt-2 overflow-hidden rounded-3 shadow-sm ${className}`}
    >
      <details
        id="scoreboard-accordion"
        className="d-flex flex-column text-dark"
        open={!!isOpen}
      >
        <summary className="bg-subtle d-flex justify-content-between align-items-center flex-grow-1 px-3 py-2">
          <h2 className="d-flex fs-6 fw-semibold mb-0">
            {text.scoreBoard.header}
          </h2>
          <div className="d-flex align-items-center gap-2">
            <span className="status-badge status-badge--primary ms-1">
              {text.scoreBoard.rounds}
              {totalRounds}
            </span>
            <div className="p-1 text-secondary">
              <FaChevronDown />
            </div>
          </div>
        </summary>
        <ul className="list-group list-group-flush">
          {players.map((player) => (
            <ScoreboardPlayer key={player.playerId} player={player} />
          ))}
        </ul>
      </details>
    </section>
  );
};
