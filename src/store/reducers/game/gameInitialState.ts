import { roundsMock } from "../../../__mocks__/data/RoundsMock";
import { EGameType } from "../../../models/enum/EGameType";
import { TRound } from "../../../models/type/TRound";

export interface IGameInitialState {
  playerIds: string[];
  rounds: TRound[];
  displayUsers: boolean;
  gameType: EGameType
}

const gameInitialState: IGameInitialState = {
  playerIds: roundsMock[0].players,
  rounds: roundsMock,
  displayUsers: false,
  gameType: EGameType.Default
};

export { gameInitialState };
