import { RoundList } from "../../components/game/rounds/RoundList";
import { Topbar } from "../../components/layout/Topbar";
import { Footer } from "../../components/layout/Footer";
import { Podium } from "../../components/game/podium/Podium";
import { useAppSelector } from "../../store/redux/hooks";
import {
  selectGameFinished,
  selectIsDemoGame,
} from "../../store/reducers/game/gameSlice";
import { GameHero } from "../../components/game/gameHero/GameHero";
import { Scoreboard } from "../../components/game/scoreboard/Scoreboard";

export const Game = () => {
  const gameFinished = useAppSelector(selectGameFinished);
  const isDemoGame = useAppSelector(selectIsDemoGame);

  if (isDemoGame) {
    return <GameHero />;
  }
  return (
    <main className="main d-flex flex-column justify-content-between bg-dark-subtle">
      <Topbar />
      <section className="px-1 py-1 flex-grow-1">
        {gameFinished && <Podium />}
        <Scoreboard />
        <RoundList />
      </section>
      <Footer />
    </main>
  );
};
