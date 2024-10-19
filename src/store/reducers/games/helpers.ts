import { nanoid } from "@reduxjs/toolkit";
import { IGameInitialState } from "../../../models/interface/IGameInitialState";
import { TGameSettings } from "../../../models/type/gameSettings/TGameSettings";
import { ICreateGame } from "../../../models/interface/ICreateGame";
import { generateNewRound } from "../helpers";

export const generateNewGame = (payload: ICreateGame): IGameInitialState => {
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
