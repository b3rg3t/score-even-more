import { text } from "../../../localization/eng";
import { GameList } from "../gameList/GameList";
import { CreateGame } from "../gameSettings/CreateGameForm";

export const GameHero = () => {
  return (
    <main className="d-flex flex-column justify-content-start align-items-center h-100 pt-2">
      <div style={{ maxWidth: 300 }}>
        <h1 className="text-white text-center">{text.appName}</h1>
        <p className="text-white">{text.gameHero.welcome}</p>
        <CreateGame />
      </div>
      <div className="w-100 mt-2" style={{ maxWidth: 300 }}>
        <h2 className="text-white text-center">
          {text.gameHero.gameList.header}
        </h2>
        <GameList />
      </div>
    </main>
  );
};
