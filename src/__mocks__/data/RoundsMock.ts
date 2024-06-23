import { nanoid } from "@reduxjs/toolkit";
import { TRound } from "../../models/type/TRound";
import { playersMock } from "./PlayersMock";
import { getDefaultScore } from "../../store/reducers/game/helper";

export const roundsMock: TRound[] = [
  {
    roundId: nanoid(),
    players: [
      playersMock[0].playerId,
      playersMock[1].playerId,
      playersMock[2].playerId,
    ],
    round: 1,
    created: new Date().toLocaleString(),
    score: getDefaultScore(playersMock.map((player) => (player.playerId)))
  },
];
