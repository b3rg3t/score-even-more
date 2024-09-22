import { EntityId } from "@reduxjs/toolkit";
import { TRound } from "../type/TRound";
import { TGameTypeOption } from "../type/gameSettings/TGameTypeOptions";
import { TGameSettings } from "../type/gameSettings/TGameSettings";

export interface IGameInitialState {
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
   * Not in use but will change score values
   */
  gameType?: TGameTypeOption;
  /**
   * If game has ended
   */
  gameFinished: boolean;
  /**
   * Potential game settings for each game, not in use yet
   */
  gameSettings?: TGameSettings;
}
