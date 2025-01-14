import { TGameTypeOption } from "./TGameTypeOptions";

export type TGameSettings = {
  gameName: string;
  calcScoreBy: number | null;
  scoreToWin: number | null;
  maxScorePerRound?: number | null;
  gameType?: TGameTypeOption | null;
  lockOnNewRound?: boolean;
  /**
   * Temp mocked initial game
   */
  isDemo?: boolean;
};
