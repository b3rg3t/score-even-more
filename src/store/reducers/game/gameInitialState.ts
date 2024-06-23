import { EntityId, nanoid } from "@reduxjs/toolkit";
import { roundsMock } from "../../../__mocks__/data/RoundsMock";
import { EGameType } from "../../../models/enum/EGameType";
import { TRound } from "../../../models/type/TRound";
import { TGameTypeOption } from "../../../models/type/TGameTypeOptions";
import { text } from "../../../localization/eng";

export interface IGameInitialState {
  gameId: string;
  playerIds: EntityId[];
  rounds: TRound[];
  displayUsers: boolean;
  gameType?: TGameTypeOption;
}

const gameInitialState: IGameInitialState = {
  gameId: nanoid(),
  playerIds: roundsMock[0].players,
  rounds: roundsMock,
  displayUsers: false,
  gameType: { label: text.gameSettings.Default, value: EGameType.Default },
};

export { gameInitialState };
