import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import {
  selectByGameId,
  selectPlayersProfile,
  setActiveGame,
} from "../../../store/reducers/game/gameSlice";
import { IGame } from "../../../models/interface/IGame";
import { FaUsers } from "react-icons/fa6";
import { text } from "../../../localization/eng";

export interface IGameItem {
  gameId: IGame["gameId"];
  callBackFunction?: () => void;
}

export const GameItem: FC<IGameItem> = ({ gameId, callBackFunction }) => {
  const dispatch = useAppDispatch();
  const game = useAppSelector(selectByGameId(gameId));
  const players = useAppSelector(selectPlayersProfile);

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
              {players.map((player, idx) => (
                <li id={player.playerId}>
                  {player.name}
                  {idx < players.length - 1 && ", " + " "}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </button>
    </li>
  );
};
