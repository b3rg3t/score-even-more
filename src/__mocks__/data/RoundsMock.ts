import { nanoid } from "@reduxjs/toolkit";
import { ROUND } from "../../models/round";
import { playersMock } from "./PlayersMock";

const score: any = {};
for(const player of playersMock){
  score[player.playerId] = 0;
}

export const roundsMock: ROUND[] = [
  {
    roundId: nanoid(),
    players: [
      playersMock[0].playerId,
      playersMock[1].playerId,
      playersMock[2].playerId,
    ],
    round: 1,
    created: new Date().toLocaleString(),
    score
  },
];
