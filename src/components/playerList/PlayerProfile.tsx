import { FC, FormEvent, useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaCheck,
  FaEdit,
  FaGamepad,
  FaTrophy,
} from "react-icons/fa";
import { EPlayerIcon } from "../../models/enum/EPlayerIcon";
import { IGame } from "../../models/interface/IGame";
import { TPlayer } from "../../models/type/players/TPlayer";
import { text } from "../../localization/eng";
import { playerIcons } from "../../data/PlayerIcons";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import {
  selectActiveGame,
  selectGames,
  setActiveGame,
} from "../../store/reducers/game/gameSlice";
import { updateOnePlayer } from "../../store/reducers/players/playersSlice";
import { UserImage } from "../shared/UserImage";
import { GameItem } from "../game/gameList/GameItem";
import "./playerProfile.scss";

interface IPlayerProfile {
  player: TPlayer;
  onBack: () => void;
  onGameSelect: () => void;
}

const getGameScore = (game: IGame, playerId: string) =>
  game.rounds.reduce((total, round) => {
    const score = round.score?.[playerId];
    return (
      total + (typeof score === "number" && Number.isFinite(score) ? score : 0)
    );
  }, 0);

export const PlayerProfile: FC<IPlayerProfile> = ({
  player,
  onBack,
  onGameSelect,
}) => {
  const dispatch = useAppDispatch();
  const games = useAppSelector(selectGames);
  const activeGame = useAppSelector(selectActiveGame);
  const [name, setName] = useState(player.name);

  const playerGames = useMemo(() => {
    const allGames = games.map((game) =>
      game.gameId === activeGame.gameId ? activeGame : game,
    );

    if (!allGames.some((game) => game.gameId === activeGame.gameId)) {
      allGames.push(activeGame);
    }

    return allGames.filter(
      (game) =>
        !game.gameSettings?.isDemo && game.playerIds.includes(player.playerId),
    );
  }, [activeGame, games, player.playerId]);

  const wins = useMemo(
    () =>
      playerGames.filter((game) => {
        if (!game.gameFinished) {
          return false;
        }

        const playerScore = getGameScore(game, player.playerId);
        const otherScores = game.playerIds
          .filter((playerId) => playerId !== player.playerId)
          .map((playerId) => getGameScore(game, String(playerId)));
        const bestOtherScore = otherScores.length
          ? game.gameSettings.winBy === "asc"
            ? Math.min(...otherScores)
            : Math.max(...otherScores)
          : playerScore;

        return game.gameSettings.winBy === "asc"
          ? playerScore <= bestOtherScore
          : playerScore >= bestOtherScore;
      }).length,
    [player.playerId, playerGames],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      updateOnePlayer({
        id: player.playerId,
        changes: { name: name.trim() },
      }),
    );
  };

  const handleIconChange = (icon: EPlayerIcon) => {
    dispatch(
      updateOnePlayer({
        id: player.playerId,
        changes: { icon },
      }),
    );
  };

  const handleGameSelect = (game: IGame) => {
    dispatch(setActiveGame(game));
    onGameSelect();
  };

  return (
    <section className="player-profile" aria-labelledby="player-profile-title">
      <header className="player-profile__topbar">
        <button type="button" className="player-profile__back" onClick={onBack}>
          <FaArrowLeft aria-hidden="true" />
          {text.playerProfile.back}
        </button>
        <span className="player-profile__eyebrow">
          {text.playerProfile.profileLabel}
        </span>
      </header>

      <section className="player-profile__hero">
        <div className="player-profile__identity">
          <UserImage icon={player.icon} size={72} border />
          <div className="player-profile__identity-copy">
            <h2 id="player-profile-title">{player.name}</h2>
            <span className="player-profile__summary">
              {text.playerProfile.playerSummary}
            </span>
          </div>
        </div>
        <div className="player-profile__stats">
          <div className="player-profile__stat">
            <span className="player-profile__stat-icon">
              <FaGamepad aria-hidden="true" />
            </span>
            <span className="player-profile__stat-label">
              {text.playerProfile.gamesPlayed}
            </span>
            <strong>{playerGames.length}</strong>
          </div>
          <div className="player-profile__stat">
            <span className="player-profile__stat-icon player-profile__stat-icon--win">
              <FaTrophy aria-hidden="true" />
            </span>
            <span className="player-profile__stat-label">
              {text.playerProfile.totalWins}
            </span>
            <strong>{wins}</strong>
          </div>
        </div>
      </section>

      <section
        className="player-profile__panel"
        aria-labelledby="profile-edit-title"
      >
        <header className="player-profile__section-heading">
          <span className="player-profile__section-icon">
            <FaEdit aria-hidden="true" />
          </span>
          <div>
            <h3 id="profile-edit-title">{text.playerProfile.personalize}</h3>
            <p>{text.playerProfile.personalizeHint}</p>
          </div>
        </header>
        <form onSubmit={handleSubmit} className="player-profile__form">
          <label htmlFor="player-profile-name">{text.playerProfile.name}</label>
          <div className="player-profile__name-field">
            <input
              id="player-profile-name"
              className="form-control"
              value={name}
              required
              onChange={(event) => setName(event.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!name.trim() || name.trim() === player.name}
            >
              <FaCheck aria-hidden="true" />
              {text.button.save}
            </button>
          </div>
        </form>

        <fieldset className="player-profile__avatar-field">
          <legend>{text.playerProfile.image}</legend>
          <div className="player-profile__avatar-options">
            {playerIcons.map(({ icon, name: iconName }) => {
              const isSelected =
                (player.icon ?? EPlayerIcon.GRADUATE) === iconName;
              return (
                <button
                  key={iconName}
                  type="button"
                  title={text.playerProfile.icons[iconName]}
                  aria-label={text.playerProfile.icons[iconName]}
                  aria-pressed={isSelected}
                  className={`player-profile__avatar-option${isSelected ? " player-profile__avatar-option--selected" : ""}`}
                  onClick={() => handleIconChange(iconName)}
                >
                  {icon}
                </button>
              );
            })}
          </div>
        </fieldset>
      </section>

      <section
        className="player-profile__games"
        aria-labelledby="player-profile-games-title"
      >
        <header className="player-profile__games-heading">
          <div>
            <span className="player-profile__eyebrow">
              {text.playerProfile.activity}
            </span>
            <h3 id="player-profile-games-title">{text.playerProfile.games}</h3>
          </div>
          <span className="player-profile__game-count">
            {playerGames.length}
          </span>
        </header>
        {playerGames.length ? (
          <ul className="player-profile__game-list">
            {playerGames.map((game) => (
              <GameItem
                key={game.gameId}
                game={game}
                isActive={game.gameId === activeGame.gameId}
                onSelect={handleGameSelect}
              />
            ))}
          </ul>
        ) : (
          <div className="player-profile__empty d-flex align-items-center">
            <FaGamepad aria-hidden="true" />
            <p>{text.playerProfile.noGames}</p>
          </div>
        )}
      </section>
    </section>
  );
};
