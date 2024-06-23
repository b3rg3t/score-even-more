import { nanoid } from "@reduxjs/toolkit";
import { TRound } from "../../models/type/TRound";
import { playersMock } from "./PlayersMock";
import { getDefaultScore } from "../../store/reducers/game/helper";

export const roundsMock: TRound[] = [
  {
    roundId: nanoid(),
    round: 1,
    created: new Date().toLocaleString(),
    score: getDefaultScore(playersMock.map((player) => (player.playerId)))
  },
];
