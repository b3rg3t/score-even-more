import { FC } from "react";
import { IGameInitialState } from "../../../models/interface/IGameInitialState";
import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import { selectByGameId } from "../../../store/reducers/games/gamesSlice";
import { setActiveGame } from "../../../store/reducers/game/gameSlice";

interface IGameItem {
  gameId: IGameInitialState["gameId"];
}

export const GameItem: FC<IGameItem> = ({ gameId }) => {
  const dispatch = useAppDispatch();
  const game = useAppSelector(selectByGameId(gameId));

  const handleSetActiveGame = () => {
    if (game) {
      dispatch(setActiveGame(game));
    }
  };

  return (
    <li id={gameId}>
      <button type="button" onClick={handleSetActiveGame}>
        {game?.gameSettings?.gameName}
      </button>
    </li>
  );
};
