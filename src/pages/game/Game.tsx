import { RoundList } from "../../components/game/rounds/RoundList";
import { Topbar } from "../../components/layout/Topbar";
import { ScoreBoard } from "../../components/game/score/ScoreBoard";
import { Footer } from "../../components/layout/Footer";
import { Podium } from "../../components/game/podium/Podium";
import { useAppSelector } from "../../store/redux/hooks";
import { selectGameFinished } from "../../store/reducers/game/gameSlice";

export const Game = () => {
  const gameFinished = useAppSelector(selectGameFinished);
  return (
    <main className="main d-flex flex-column justify-content-between bg-dark-subtle">
      <Topbar />
      <section className="px-1 py-1 flex-grow-1">
        {!gameFinished && <Podium />}
        <ScoreBoard />
        <RoundList />
      </section>
      <Footer />
    </main>
  );
};
