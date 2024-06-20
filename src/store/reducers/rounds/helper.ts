import { ROUND } from "../../../models/round";

export const calcTotalScore = (rounds: ROUND[]) => {
  const obj: any = {};
  let idx = 0;
  for (const round of rounds) {
    if (idx === 0) {
      for (const player in round.score) {
        obj[player] = round.score[player];
      }
    } else {
      for (const player in round.score) {
        obj[player] = obj[player] + round.score[player];
      }
    }
    idx++;
  }
  return obj;
};

export const getDefaultScore = (playerIds: string[]) => {
  const defaultScore: any = {};
  for (const player of playerIds) {
    defaultScore[player] = 0;
  }
};
