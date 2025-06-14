import { TGameTypeOption } from "./TGameTypeOptions";

export type TGameSettings = {
  gameName: string;
  calcScoreBy: number | null;
  scoreToWin: number | null;
  maxScorePerRound?: number | null;
  gameType?: TGameTypeOption | null;
  winBy?: "desc" | "asc";
  loseBy?: number | null;
  lockOnNewRound?: boolean;
  slideRound?: boolean;
  playerSize?: boolean;
  startScore?: number;
  useAdvancedGameSettings?: boolean;
  /**
   * Temp mocked initial game
   */
  isDemo?: boolean;
};
