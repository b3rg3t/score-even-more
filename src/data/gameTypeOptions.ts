import { text } from "../localization/eng";
import { EGameType } from "../models/enum/EGameType";
import { TGameTypeOption } from "../models/type/gameSettings/TGameTypeOptions";

const { gameSettings } = text;

export const gameTypeOptions: TGameTypeOption[] = [
  {
    label: gameSettings.gameTypeOptions[EGameType.Default],
    value: EGameType.Default,
  },
  {
    label: gameSettings.gameTypeOptions[EGameType.Chicago],
    value: EGameType.Chicago,
  },
  {
    label: gameSettings.gameTypeOptions[EGameType.Padel],
    value: EGameType.Padel,
  },
];
