import { nanoid } from "@reduxjs/toolkit";
import { TPlayer } from "../../models/type/TPlayer";

export const playersMock: TPlayer[] = [
  {
    playerId: nanoid(),
    name: "Bert",
  },
  {
    playerId: nanoid(),
    name: "Bot",
  },
  {
    playerId: nanoid(),
    name: "Blubb",
  },
];
