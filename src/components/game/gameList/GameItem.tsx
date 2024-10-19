import { FC } from "react";
import { IGameInitialState } from "../../../models/interface/IGameInitialState";
import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import { selectByGameId } from "../../../store/reducers/games/gamesSlice";
import { setActiveGame } from "../../../store/reducers/game/gameSlice";

export interface IGameItem {
  gameId: IGameInitialState["gameId"];
  callBackFunction?: () => void;
}

export const GameItem: FC<IGameItem> = ({ gameId, callBackFunction }) => {
  const dispatch = useAppDispatch();
  const game = useAppSelector(selectByGameId(gameId));

  const handleSetActiveGame = () => {
    if (game) {
      dispatch(setActiveGame(game));
      callBackFunction && callBackFunction()
    }
  };

  return (
    <li id={gameId}>
      <button className="btn text-white border w-100" type="button" onClick={handleSetActiveGame}>
        {game?.gameSettings?.gameName}
      </button>
    </li>
  );
};
