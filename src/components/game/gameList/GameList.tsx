import { text } from "../../../localization/eng";
import {
  selectActiveGameId,
  selectAllGameIds,
  selectByGameId,
  setActiveGame,
} from "../../../store/reducers/game/gameSlice";
import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import { GameItem } from "./GameItem";
import { FC } from "react";
import { FaDice } from "react-icons/fa6";
import { IGame } from "../../../models/interface/IGame";

interface IGameList {
  callBackFunction?: () => void;
}

interface IGameListItem {
  gameId: IGame["gameId"];
  callBackFunction?: () => void;
}

const GameListItem: FC<IGameListItem> = ({ gameId, callBackFunction }) => {
  const dispatch = useAppDispatch();
  const game = useAppSelector(selectByGameId(gameId));
  const activeGameId = useAppSelector(selectActiveGameId);

  if (!game) {
    return null;
  }

  const isActive = activeGameId === game.gameId;
  const handleSelect = () => {
    if (isActive) {
      return;
    }

    dispatch(setActiveGame(game));
    callBackFunction?.();
  };

  return (
    <GameItem
      game={game}
      isActive={isActive}
      onSelect={isActive ? undefined : handleSelect}
    />
  );
};

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
        <GameListItem
          key={gameId}
          gameId={gameId}
          callBackFunction={callBackFunction}
        />
      ))}
    </ul>
  );
};
