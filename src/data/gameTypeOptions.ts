import { text } from "../localization/eng";
import { EGameType } from "../models/enum/EGameType";
import { TGameTypeOptions } from "../models/type/TGameTypeOptions";

const { gameSettings } = text;

/**
 * Cardgames 100 - 199
 * Sports 200 - 299
 */
export const gameTypeOptions: TGameTypeOptions = [
  { label: gameSettings[EGameType.Default], value: 100 },
  { label: gameSettings[EGameType.Chicago], value: 101 },
  { label: gameSettings[EGameType.Padel], value: 200 },
];
