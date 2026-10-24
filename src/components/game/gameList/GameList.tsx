import { text } from "../../../localization/eng";
import { selectAllGameIds } from "../../../store/reducers/game/gameSlice";
import { useAppSelector } from "../../../store/redux/hooks";
import { GameItem, IGameItem } from "./GameItem";
import { FC } from "react";
import { FaDice } from "react-icons/fa6";

type IGameList = Omit<IGameItem, "gameId">;

export const GameList: FC<IGameList> = ({ callBackFunction }) => {
  const games = useAppSelector(selectAllGameIds);

  if (!games.length) {
    return (
      <div className="game-home__empty-state">
        <span className="game-home__empty-icon" aria-hidden="true">
          <FaDice />
        </span>
        <p className="game-home__empty-title">
          {text.gameHero.gameList.noGame}
        </p>
        <p>{text.gameHero.gameList.emptyDescription}</p>
      </div>
    );
  }
  return (
    <ul className="game-home__game-list list-unstyled d-flex flex-column gap-2">
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
