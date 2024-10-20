import { EntityId, nanoid } from "@reduxjs/toolkit";
import { TRound } from "../../../models/type/TRound";
import { ICreateGameExtended } from "../../../models/interface/ICreateGame";
import { IGame } from "../../../models/interface/IGame";
import { TGameSettings } from "../../../models/type/gameSettings/TGameSettings";

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

const generateNewGame = (payload: ICreateGameExtended): IGame => {
  const gameSettings: TGameSettings = (({
    gameName,
    calcScoreBy,
    scoreToWin,
    maxScorePerRound,
    gameType,
  }) => ({ gameName, calcScoreBy, scoreToWin, maxScorePerRound, gameType }))(
    payload
  );

  const playerIds = payload.players
    ? payload.players?.map((player) => player.playerId)
    : [];

  return {
    gameId: nanoid(),
    rounds: [generateNewRound(playerIds)],
    playerIds: playerIds,
    gameFinished: false,
    gameSettings,
  };
};

const generateNewRound = (
  playerIds: IGame["playerIds"],
  round?: TRound["round"]
): TRound => {
  const defaultScore = getDefaultScore(playerIds);

  const newRound: TRound = {
    roundId: nanoid(),
    round: round ? round++ : 1,
    created: new Date().toLocaleString(),
    score: defaultScore,
  };

  return newRound;
};

export { getDefaultScore, calcTotalScore, generateNewGame, generateNewRound };
