import { RoundList } from "../../components/rounds/RoundList";
import { Topbar } from "../../components/layout/Topbar";
import { ScoreBoard } from "../../components/score/ScoreBoard";
import { Footer } from "../../components/layout/Footer";
import { PlayerSection } from "../../components/players/PlayerSection";
import { Podium } from "../../components/podium/Podium";
import { useAppSelector } from "../../store/redux/hooks";
import { selectGameFinished } from "../../store/reducers/game/gameSlice";

export const Game = () => {
  const gameFinished = useAppSelector(selectGameFinished);
  return (
    <main className="main d-flex flex-column justify-content-between bg-dark-subtle">
      <Topbar />
      <section className="px-1 py-1 flex-grow-1">
        {!gameFinished && <Podium />}
        <PlayerSection />
        <ScoreBoard />
        <RoundList />
      </section>
      <Footer />
    </main>
  );
};
