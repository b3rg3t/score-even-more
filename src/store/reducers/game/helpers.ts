import { EntityId, nanoid } from "@reduxjs/toolkit";
import { TRound } from "../../../models/type/TRound";
import { ICreateGameExtended } from "../../../models/interface/ICreateGame";
import { IGame } from "../../../models/interface/IGame";
import { TGameSettings } from "../../../models/type/gameSettings/TGameSettings";
import { TPlayer } from "../../../models/type/TPlayer";

type ScoreRecord = Record<string, number>;

const calcTotalScore = (rounds: TRound[]): ScoreRecord => {
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

const calcScoreByPlayer = (rounds: TRound[], players: TPlayer[]) => {
  const scoreByPlayer = calcTotalScore(rounds);

  const sortedScores = Object.entries(scoreByPlayer)
  .map(([playerId, totalScore]) => ({ playerId, totalScore }))

  return sortedScores.map((entry) => {
    const player = players.find((p) => p.playerId === entry.playerId);

    return { ...entry, name: player?.name };
  });
}

const calcPositionByScore = (rounds: TRound[], players: TPlayer[]) => {
  const scoreByPlayer = calcTotalScore(rounds);

  const sortedScores = Object.entries(scoreByPlayer)
    .map(([playerId, totalScore]) => ({ playerId, totalScore }))
    .sort((a, b) => b.totalScore - a.totalScore);

  // arr as third argument
  return sortedScores.map((entry, index) => {
    const player = players.find((p) => p.playerId === entry.playerId);
    // if (index > 0 && arr[index - 1].totalScore > entry.totalScore) {
    return { ...entry, position: index + 1, name: player?.name };
  });
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
    lockOnNewRound,
  }) => ({
    gameName,
    calcScoreBy,
    scoreToWin,
    maxScorePerRound,
    gameType,
    lockOnNewRound,
  }))(payload);

  const playerIds = payload.players
    ? payload.players?.map((player) => player.playerId)
    : [];

  return {
    gameId: nanoid(),
    rounds: [generateNewRound(playerIds, gameSettings.lockOnNewRound)],
    playerIds: playerIds,
    gameFinished: false,
    gameSettings,
  };
};

const generateNewRound = (
  playerIds: IGame["playerIds"],
  isLocked?: IGame["gameSettings"]["lockOnNewRound"],
  round?: TRound["round"]
): TRound => {
  const defaultScore = getDefaultScore(playerIds);

  const newRound: TRound = {
    roundId: nanoid(),
    round: round ? round++ : 1,
    created: new Date().toLocaleString(),
    score: defaultScore,
    isRoundLocked: isLocked,
  };

  return newRound;
};

export {
  getDefaultScore,
  calcTotalScore,
  generateNewGame,
  generateNewRound,
  calcPositionByScore,
  calcScoreByPlayer
};
