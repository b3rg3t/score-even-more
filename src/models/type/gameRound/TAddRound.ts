import { TPlayer } from "../players/TPlayer";
import { TRound } from "../TRound";

export type TAddRound = {
  roundId: TRound["roundId"];
  score: {
    player: TPlayer["playerId"];
    score: number;
  };
};
