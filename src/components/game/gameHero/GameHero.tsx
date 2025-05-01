import { text } from "../../../localization/eng";
import { Divider } from "../../divider/Divider";
import { GameList } from "../gameList/GameList";
import { CreateGame } from "../gameSettings/CreateGameForm";
import logo from "/public/180x180.png";

export const GameHero = () => {
  return (
    <main className="d-flex flex-column justify-content-start align-items-center h-100 pt-2 px-2">
      <div style={{ maxWidth: 400 }}>
        <header className="d-flex gap-2 mb-2">
          <img src={logo} width={40} height={40} />
          <h1 className="text-white mb-0">{text.appName}</h1>
        </header>
        <Divider />
        <p className="text-white">{text.gameHero.welcome}</p>
        <CreateGame />
      </div>
      <div className="w-100 mt-2" style={{ maxWidth: 400 }}>
        <h2 className="text-white">{text.gameHero.gameList.header}</h2>
        <GameList />
      </div>
    </main>
  );
};
