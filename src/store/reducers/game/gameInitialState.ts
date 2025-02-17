import { gameMock } from "../../../__mocks__/data/GameMock";
import { IGameInitialState } from "../../../models/interface/IGameInitialState";

const gameInitialState: IGameInitialState = {
  activeGame: gameMock,
  games: [gameMock],
  burgerMenuOpen: false,
  scoreboardOpen: true
};

export { gameInitialState };
