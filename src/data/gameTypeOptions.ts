import { text } from "../localization/eng";
import { EGameType } from "../models/enum/EGameType";
import { TGameTypeOption } from "../models/type/gameSettings/TGameTypeOptions";

const { gameSettings } = text;

export const gameTypeOptions: TGameTypeOption[] = [
  {
    label: gameSettings.gameTypeOptions[EGameType.DEFAULT],
    value: EGameType.DEFAULT,
  },
  {
    label: gameSettings.gameTypeOptions[EGameType.CHICAGO],
    value: EGameType.CHICAGO,
  },
  {
    label: gameSettings.gameTypeOptions[EGameType.PADEL],
    value: EGameType.PADEL,
  },
];
