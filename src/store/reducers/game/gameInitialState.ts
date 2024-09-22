import { nanoid } from "@reduxjs/toolkit";
import { roundsMock } from "../../../__mocks__/data/RoundsMock";
import { EGameType } from "../../../models/enum/EGameType";
import { text } from "../../../localization/eng";
import { playersMock } from "../../../__mocks__/data/PlayersMock";
import { IGameInitialState } from "../../../models/interface/IGameInitialState";

const gameInitialState: IGameInitialState = {
  gameId: nanoid(),
  playerIds: playersMock.map((player) => player.playerId),
  rounds: roundsMock,
  displayUsers: false,
  gameType: {
    label: text.gameSettings.gameTypeOptions.Default,
    value: EGameType.Default,
  },
  gameFinished: false,
  gameSettings: undefined,
};

export { gameInitialState };
