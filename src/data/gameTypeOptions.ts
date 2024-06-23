import { text } from "../localization/eng";
import { EGameType } from "../models/enum/EGameType";
import { TGameTypeOption } from "../models/type/TGameTypeOptions";

const { gameSettings } = text;

export const gameTypeOptions: TGameTypeOption[] = [
  {
    label: gameSettings[EGameType.Default],
    value: EGameType.Default,
  },
  {
    label: gameSettings[EGameType.Chicago],
    value: EGameType.Chicago,
  },
  {
    label: gameSettings[EGameType.Padel],
    value: EGameType.Padel,
  },
];
