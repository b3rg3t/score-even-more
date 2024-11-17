import { text } from "../../../localization/eng";
import { CreateGame } from "../createGame/CreateGame";

export const GameHero = () => {
  return (
    <main className="bg-dark d-flex justify-content-center h-100">
      <div style={{ maxWidth: 300 }}>
        <h1 className="text-white text-center">{text.appName}</h1>
        <p className="text-white">{text.gameHero.welcome}</p>
        <CreateGame />
      </div>
    </main>
  );
};
