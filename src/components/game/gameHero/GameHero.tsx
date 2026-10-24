import { text } from "../../../localization/eng";
import { Divider } from "../../divider/Divider";
import { GameList } from "../gameList/GameList";
import { CreateGame } from "../gameSettings/CreateGameForm";
import logo from "../../../assets/180x180.png";

export const GameHero = () => {
  return (
    <main className="game-home">
      <div className="game-home__shell">
        <header className="game-home__header">
          <div className="game-home__brand">
            <img src={logo} width={40} height={40} alt="" />
            <h1>{text.appName}</h1>
          </div>
          <span className="game-home__header-note">
            Your games, all in one place
          </span>
        </header>

        <Divider />

        <section className="game-home__intro" aria-labelledby="game-home-title">
          <div>
            <p className="game-home__eyebrow">Make every round count</p>
            <h2 id="game-home-title">{text.gameHero.title}</h2>
            <p>{text.gameHero.welcome}</p>
          </div>
          <div className="game-home__score-mark" aria-hidden="true">
            <span>01</span>
            <span>02</span>
            <span>03</span>
          </div>
        </section>

        <div className="game-home__workspace">
          <section
            className="game-home__panel game-home__create-panel"
            aria-labelledby="create-game-title"
          >
            <div className="game-home__panel-heading">
              <span className="game-home__step">01</span>
              <div>
                <h2 id="create-game-title">{text.gameHero.createTitle}</h2>
                <p>{text.gameHero.createDescription}</p>
              </div>
            </div>
            <CreateGame />
          </section>

          <section
            className="game-home__panel game-home__games-panel"
            aria-labelledby="your-games-title"
          >
            <div className="game-home__panel-heading">
              <span className="game-home__step game-home__step--muted">02</span>
              <div>
                <h2 id="your-games-title">{text.gameHero.gameList.header}</h2>
                <p>{text.gameHero.gameList.description}</p>
              </div>
            </div>
            <GameList />
          </section>
        </div>
      </div>
    </main>
  );
};
