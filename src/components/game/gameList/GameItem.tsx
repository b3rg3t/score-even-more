import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import {
  selectByGameId,
  setActiveGame,
} from "../../../store/reducers/game/gameSlice";
import { IGame } from "../../../models/interface/IGame";
import { FaUsers } from "react-icons/fa6";
import { text } from "../../../localization/eng";
import { PlayerName } from "./PlayerName";

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
          <div className="d-flex flex-column align-items-start gap-1">
            <span>{game?.gameSettings?.gameName}</span>
            <span className="d-flex align-items-center badge rounded-pill text-bg-info text-white">
              {text.scoreBoard.rounds}
              {game?.rounds.length}
            </span>
          </div>
          <div className="d-flex flex-column align-items-end gap-1">
            <span className="d-flex gap-1 align-items-center">
              <FaUsers />
              {game?.playerIds.length}
            </span>
            <ul className="list-unstyled d-flex">
              {game?.playerIds.map((player, idx) => (
                <PlayerName
                  key={player}
                  id={player}
                  comma={idx < game.playerIds.length - 1}
                />
              ))}
            </ul>
          </div>
        </div>
      </button>
    </li>
  );
};
