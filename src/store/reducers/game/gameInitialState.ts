import { nanoid } from "@reduxjs/toolkit";
import { roundsMock } from "../../../__mocks__/data/RoundsMock";
import { playersMock } from "../../../__mocks__/data/PlayersMock";
import { IGameInitialState } from "../../../models/interface/IGameInitialState";
import { IGame } from "../../../models/interface/IGame";

const activeGame: IGame = {
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

const gameInitialState: IGameInitialState = {
  activeGame: activeGame,
  games: [activeGame],
};

export { gameInitialState };
