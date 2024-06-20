import { nanoid } from "@reduxjs/toolkit";
import { PLAYER } from "../../models/player";

export const playersMock: PLAYER[] = [
  {
    playerId: nanoid(),
    name: "David",
  },
  {
    playerId: nanoid(),
    name: "Linn",
  },
  {
    playerId: nanoid(),
    name: "Blubb",
  },
];
