import { RoundList } from "../../components/rounds/RoundList";
import { AddRoundButton } from "../../components/rounds/AddRoundButton";

import { PlayerSection } from "../../components/players/PlayerSection";

export const Scoreboard = () => {
  return (
    <>
      <h2>Player</h2>
      <PlayerSection />
      <div>Scoreboard</div>
      <AddRoundButton />
      <RoundList />
    </>
  );
};
