import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import {
  selectByGameId,
  setActiveGame,
} from "../../../store/reducers/game/gameSlice";
import { IGame } from "../../../models/interface/IGame";
import { FaUsers } from "react-icons/fa6";

export interface IGameItem {
  gameId: IGame["gameId"];
  callBackFunction?: () => void;
}

export const GameItem: FC<IGameItem> = ({ gameId, callBackFunction }) => {
  const dispatch = useAppDispatch();
  const game = useAppSelector(selectByGameId(gameId));

  const handleSetActiveGame = () => {
    if (game) {
      dispatch(setActiveGame(game));
      callBackFunction && callBackFunction();
    }
  };

  return (
    <li id={gameId}>
      <button
        className="btn btn-outline-primary text-white w-100"
        type="button"
        onClick={handleSetActiveGame}
      >
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex gap-2">
            <span className="d-flex align-items-center badge rounded-pill text-bg-info text-white">
              {game?.rounds.length}
            </span>
            <span>{game?.gameSettings?.gameName}</span>
          </div>
          <div className="d-flex gap-2">
            <span className="d-flex gap-1 align-items-center">
              <FaUsers />
              {game?.playerIds.length}
            </span>
          </div>
        </div>
      </button>
    </li>
  );
};
