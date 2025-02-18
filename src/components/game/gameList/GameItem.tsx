import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import {
  selectActiveGameId,
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
  const activeGameId = useAppSelector(selectActiveGameId);

  const isActiveGame = activeGameId === game?.gameId;

  const handleSetActiveGame = () => {
    if (game && !isActiveGame) {
      dispatch(setActiveGame(game));
      callBackFunction && callBackFunction();
    }
  };

  const content = () => {
    return (
      <div className="d-flex justify-content-between w-100 gap-4">
        <div className="d-flex flex-column align-items-start justify-content-between gap-1">
          <span className="text-start">{game?.gameSettings?.gameName}</span>
          <span
            className={`d-flex align-items-center badge rounded-pill ${
              isActiveGame ? "text-bg-success" : "text-bg-info text-white"
            }`}
          >
            {text.scoreBoard.rounds}
            {game?.rounds.length}
          </span>
        </div>
        <div className="d-flex flex-column align-items-end gap-1">
          <div className="d-flex gap-2 align-items-center">
            {isActiveGame ? <span className="badge rounded-pill text-bg-primary">{text.button.active}</span> : null}
            <span className="d-flex gap-1 align-items-center">
              <FaUsers />
              {game?.playerIds.length}
            </span>
          </div>
          <ul className="list-unstyled d-flex flex-wrap justify-content-end">
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
    );
  };

  if (isActiveGame) {
    return (
      <li id={gameId} className="text-white border rounded p-2 bg-info">
        {content()}
      </li>
    );
  }
  return (
    <li id={gameId}>
      <button
        className="btn btn-outline-primary text-white w-100 p-2"
        type="button"
        onClick={handleSetActiveGame}
      >
        {content()}
      </button>
    </li>
  );
};
