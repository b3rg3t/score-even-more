import { ROUND } from "../../models/round";
import { playersMock } from "./PlayersMock";

export const roundsMock: ROUND[] = [
  {
    roundId: "1",
    players: [
      playersMock[0].playerId,
      playersMock[1].playerId,
      playersMock[2].playerId,
    ],
  },
];
