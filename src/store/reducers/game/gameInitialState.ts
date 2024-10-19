import { nanoid } from "@reduxjs/toolkit";
import { roundsMock } from "../../../__mocks__/data/RoundsMock";
import { playersMock } from "../../../__mocks__/data/PlayersMock";
import { IGameInitialState } from "../../../models/interface/IGameInitialState";

const gameInitialState: IGameInitialState = {
  gameId: nanoid(),
  playerIds: playersMock.map((player) => player.playerId),
  rounds: roundsMock,
  gameFinished: false,
  gameSettings: {
    gameName: "GameOne",
    calcScoreBy: null,
    scoreToWin: null,
    maxScorePerRound: 52,
    gameType: null,
  },
};

export { gameInitialState };
