import { useAppSelector } from "../../../store/redux/hooks";
import { selectSortedScoreByPlayer } from "../../../store/reducers/game/gameSlice";

export const PositionList = () => {
  const players = useAppSelector(selectSortedScoreByPlayer);

  return (
    <ul className="podium__results list-unstyled mb-0 px-3 pb-3">
      {players.map((player, idx) => (
        <li
          key={player.playerId}
          className={`podium__result d-flex align-items-center justify-content-between gap-3 py-2 ${
            idx !== players.length - 1 ? "border-bottom" : ""
          }`}
        >
          <div className="d-flex align-items-center gap-2 text-dark">
            <span className="status-badge status-badge--primary">
              {player.position}
            </span>
            <span className="text-truncate">{player.name}</span>
          </div>
          <span className="fw-semibold text-secondary">
            {player.totalScore}
          </span>
        </li>
      ))}
    </ul>
  );
};
