import { IGame } from "./IGame";

export interface IGameInitialState {
  activeGame: IGame;
  games: IGame[];
  burgerMenuOpen: boolean;
  scoreboardOpen?: boolean;
}
