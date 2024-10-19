import { useAppSelector } from "../../../store/redux/hooks";
import { selectAllGameIds } from "../../../store/reducers/games/gamesSlice";
import { GameItem, IGameItem } from "./GameItem";
import { FC } from "react";

interface IGameList extends Omit<IGameItem, "gameId"> {}

export const GameList: FC<IGameList> = ({ callBackFunction }) => {
  const games = useAppSelector(selectAllGameIds);
  return (
    <ul className="list-unstyled d-flex flex-column gap-2">
      {games.map((gameId) => (
        <GameItem
          key={gameId}
          gameId={gameId}
          callBackFunction={callBackFunction}
        />
      ))}
    </ul>
  );
};
