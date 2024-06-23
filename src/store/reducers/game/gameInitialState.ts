import { EntityId, nanoid } from "@reduxjs/toolkit";
import { roundsMock } from "../../../__mocks__/data/RoundsMock";
import { EGameType } from "../../../models/enum/EGameType";
import { TRound } from "../../../models/type/TRound";

export interface IGameInitialState {
  gameId: string;
  playerIds: EntityId[];
  rounds: TRound[];
  displayUsers: boolean;
  gameType: EGameType
}

const gameInitialState: IGameInitialState = {
  gameId: nanoid(),
  playerIds: roundsMock[0].players,
  rounds: roundsMock,
  displayUsers: false,
  gameType: EGameType.Default
};

export { gameInitialState };
