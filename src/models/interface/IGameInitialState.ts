import { EntityId } from "@reduxjs/toolkit";
import { TRound } from "../type/TRound";
import { TGameTypeOption } from "../type/TGameTypeOptions";

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
   * Display list of all players and edit name
   * 
   * Soon will have delete option for player
   */
  displayUsers: boolean;
  /**
   * Not in use but will change score values
   */
  gameType?: TGameTypeOption;
}
