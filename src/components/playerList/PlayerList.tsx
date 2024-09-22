import { useAppSelector } from "../../store/redux/hooks";
import { selectAll } from "../../store/reducers/players/playersSlice";
import { PlayerItem } from "./PlayerItem";

export const PlayerList = () => {
  const players = useAppSelector(selectAll);
  return (
    <ul className="list-unstyled">
      {players.map((player) => (
        <PlayerItem key={player.playerId} {...player} />
      ))}
    </ul>
  );
};
