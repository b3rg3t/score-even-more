import { TGameTypeOption } from "./TGameTypeOptions";

export type TGameSettings = {
  gameName: string;
  calcScoreBy: number | null;
  scoreToWin: number | null;
  maxScorePerRound?: number | null;
  gameType?: TGameTypeOption | null;
  winBy?: "desc" | "asc";
  lockOnNewRound?: boolean;
  slideRound?: boolean;
  /**
   * Temp mocked initial game
   */
  isDemo?: boolean;
};
