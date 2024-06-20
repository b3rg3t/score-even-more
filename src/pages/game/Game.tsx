import { RoundList } from "../../components/rounds/RoundList";
import { AddRoundButton } from "../../components/rounds/AddRoundButton";
// import { PlayerSection } from "../../components/players/PlayerSection";
import { Topbar } from "../../components/layout/Topbar";
import { ScoreBoard } from "../../components/score/ScoreBoard";

export const Game = () => (
  <>
    <Topbar />
    <section className="px-2 py-1">
      <ScoreBoard />
      {/* <PlayerSection /> */}
      <AddRoundButton />
      <RoundList />
    </section>
  </>
);
