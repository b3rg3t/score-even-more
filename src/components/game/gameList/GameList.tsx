import { useAppSelector } from "../../../store/redux/hooks";
import { selectAllGameIds } from "../../../store/reducers/games/gamesSlice";
import { GameItem } from "./GameItem";

export const GameList = () => {
  const games = useAppSelector(selectAllGameIds);
  return (
    <ul className="list-unstyled">
      {games.map((gameId) => (
        <GameItem key={gameId} gameId={gameId} />
      ))}
    </ul>
  );
};
