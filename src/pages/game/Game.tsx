import { RoundList } from "../../components/game/rounds/RoundList";
import { Topbar } from "../../components/layout/Topbar";
import { Footer } from "../../components/layout/Footer";
import { Podium } from "../../components/game/podium/Podium";
import { useAppSelector } from "../../store/redux/hooks";
import {
  selectGameFinished,
  selectIsDemoGame,
  selectSlideRound,
} from "../../store/reducers/game/gameSlice";
import { GameHero } from "../../components/game/gameHero/GameHero";
import { Scoreboard } from "../../components/game/scoreboard/Scoreboard";
import { SwipeRound } from "../../components/game/rounds/swiper/SwipeRound";

export const Game = () => {
  const gameFinished = useAppSelector(selectGameFinished);
  const isDemoGame = useAppSelector(selectIsDemoGame);
  const slideRound = useAppSelector(selectSlideRound);

  if (isDemoGame) {
    return <GameHero />;
  }
  return (
    <main className="main d-flex flex-column justify-content-between bg-dark-subtle">
      <Topbar />
      <section className="d-flex flex-column flex-grow-1">
        {gameFinished && <Podium />}
        <Scoreboard className="mx-2" />
        {slideRound ? <SwipeRound /> : <RoundList />}
      </section>
      <Footer />
    </main>
  );
};
