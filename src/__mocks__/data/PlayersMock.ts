import { nanoid } from "@reduxjs/toolkit";
import { PLAYER } from "../../models/player";

export const playersMock: PLAYER[] = [
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
