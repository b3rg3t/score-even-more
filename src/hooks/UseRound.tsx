import { nanoid } from "@reduxjs/toolkit";
import { TPlayer } from "../models/type/players/TPlayer";
import { playerIcons } from "../data/PlayerIcons";
import { getRandomNumber } from "../helpers/GetRandomNumber";

export const useGame = () => {
  const newPlayer = (name: string): TPlayer => {
    const player: TPlayer = {
      playerId: nanoid(),
      name: name,
      icon: playerIcons[getRandomNumber(playerIcons.length - 1)].name,
    };
    return player;
  };
  return { newPlayer };
};
