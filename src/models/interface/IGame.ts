import { EntityId } from "@reduxjs/toolkit";
import { TRound } from "../type/TRound";
import { TGameSettings } from "../type/gameSettings/TGameSettings";

export interface IGame {
  /**
   * Active game's id
   */
  gameId: string;
  /**
   * Players id's
   */
  playerIds: EntityId[];
  /**
   * All rounds for the game
   */
  rounds: TRound[];
  /**
   * If game has ended
   */
  gameFinished: boolean;
  /**
   * Potential game settings for each game, not in use yet
   */
  gameSettings: TGameSettings;
}
