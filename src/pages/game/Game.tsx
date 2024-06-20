import { RoundList } from "../../components/rounds/RoundList";
import { Topbar } from "../../components/layout/Topbar";
import { ScoreBoard } from "../../components/score/ScoreBoard";
import { Footer } from "../../components/layout/Footer";
import { PlayerSection } from "../../components/players/PlayerSection";

export const Game = () => (
  <main className="main d-flex flex-column justify-content-between bg-dark-subtle">
    <Topbar />
    <section className="px-1 py-1 flex-grow-1" >
      <PlayerSection />
      <ScoreBoard />
      <RoundList />
    </section>
    <Footer />
  </main>
);
