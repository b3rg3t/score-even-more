import { text } from "../../../localization/eng";
import { CreateGame } from "../createGameForm/CreateGameForm";
import { GameList } from "../gameList/GameList";

export const GameHero = () => {
  return (
    <main className="bg-dark d-flex flex-column justify-content-start align-items-center h-100 pt-2">
      <div style={{ maxWidth: 300 }}>
        <h1 className="text-white text-center">{text.appName}</h1>
        <p className="text-white">{text.gameHero.welcome}</p>
        <CreateGame />
      </div>
      <div className="w-100 mt-2" style={{ maxWidth: 300 }}>
        <h2 className="text-white text-center">Select a game</h2>
        <GameList />
      </div>
    </main>
  );
};
