import { EntityId } from "@reduxjs/toolkit";
import { TRound } from "../../../models/type/TRound";

const calcTotalScore = (rounds: TRound[]) => {
  const obj: any = {};
  let idx = 0;
  for (const round of rounds) {
    if (idx === 0) {
      for (const player in round.score) {
        obj[player] = round.score[player];
      }
    } else {
      for (const player in round.score) {
        obj[player] = obj[player]
          ? obj[player] + round.score[player]
          : 0 + round.score[player];
      }
    }
    idx++;
  }

  return obj;
};

const getDefaultScore = (playerIds: EntityId[]) => {
  const defaultScore: any = {};
  for (const player of playerIds) {
    defaultScore[player] = 0;
  }
};

export { getDefaultScore, calcTotalScore };
