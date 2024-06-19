import { AddPlayer } from "./AddPlayer";
import { DisplayPlayers } from "./DisplayPlayers";
import { PlayerList } from "./PlayerList";

export const PlayerSection = () => {
  return (
    <>
      <AddPlayer />
      <DisplayPlayers />
      <PlayerList />
    </>
  );
};
