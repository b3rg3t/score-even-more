import { FC } from "react";
import { IGame } from "../../../models/interface/IGame";
import { text } from "../../../localization/eng";
import { FaGamepad, FaUsers } from "react-icons/fa";
import { PlayerName } from "./PlayerName";

interface IGameItem {
  game: IGame;
  isActive: boolean;
  onSelect?: (game: IGame) => void;
}

export const GameItem: FC<IGameItem> = ({ game, isActive, onSelect }) => {
  const content = (
    <div className="game-item__content">
      <span className="game-item__icon" aria-hidden="true">
        <FaGamepad />
      </span>
      <div className="game-item__copy">
        <strong>{game.gameSettings.gameName}</strong>
        <span className="game-item__rounds">
          {text.scoreBoard.rounds} {game.rounds.length}
        </span>
        <ul className="game-item__players">
          {game.playerIds.map((player, idx) => (
            <PlayerName
              key={player}
              id={player}
              comma={idx < game.playerIds.length - 1}
            />
          ))}
        </ul>
      </div>
      <div className="game-item__meta">
        <div className="game-item__badges">
          {isActive && (
            <span className="game-item__active">{text.button.active}</span>
          )}{" "}
          <span
            className={`game-item__status${game.gameFinished ? " game-item__status--complete" : ""}`}
          >
            {game.gameFinished
              ? text.playerProfile.completed
              : text.playerProfile.inProgress}
          </span>
        </div>
        <span className="game-item__player-count">
          <FaUsers aria-hidden="true" />
          {game.playerIds.length}
        </span>
      </div>
    </div>
  );

  if (!onSelect) {
    return (
      <li
        id={game.gameId}
        className={`game-item${isActive ? " game-item--active" : ""}`}
      >
        {content}
      </li>
    );
  }

  return (
    <li
      id={game.gameId}
      className={`game-item${isActive ? " game-item--active" : ""}`}
    >
      <button
        className="game-item__button"
        type="button"
        aria-pressed={isActive}
        onClick={() => onSelect(game)}
      >
        {content}
      </button>
    </li>
  );
};
