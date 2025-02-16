import { useAppSelector } from "../../../store/redux/hooks";
import { selectSortedScoreByPlayer } from "../../../store/reducers/game/gameSlice";

export const PositionList = () => {
  const players = useAppSelector(selectSortedScoreByPlayer);
  
  return (
    <ul className="list-unstyled mb-0">
      {players.map((player, idx) => (
        <li
          key={player.playerId}
          className={`text-white d-flex justify-content-between ${
            idx !== players.length - 1 ? "border-bottom" : ""
          }`}
        >
          <div>
            <span>{player.position}.</span> <span>{player.name}</span>
          </div>
          {player.totalScore}
        </li>
      ))}
    </ul>
  );
};
