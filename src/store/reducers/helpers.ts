import { nanoid } from "@reduxjs/toolkit";
import { TRound } from "../../models/type/TRound";
import { getDefaultScore } from "./game/helpers";
import { IGameInitialState } from "../../models/interface/IGameInitialState";

export const generateNewRound = (
  playerIds: IGameInitialState["playerIds"],
  round?: TRound["round"]
) => {
  const defaultScore = getDefaultScore(playerIds);

  const newRound: TRound = {
    roundId: nanoid(),
    round: round ? round++ : 1,
    created: new Date().toLocaleString(),
    score: defaultScore,
  };

  return newRound
};
