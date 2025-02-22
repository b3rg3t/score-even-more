import { EntityId } from "@reduxjs/toolkit";
import { TRound } from "../type/TRound";
import { TGameSettings } from "../type/gameSettings/TGameSettings";
import { TPlayer } from "../type/players/TPlayer";
import { TBottomModal } from "../type/TBottomModal";

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
   * Weather scorboard accordion is open or not
   */
  scoreboardOpen?: boolean;
  /** 
   * Wich bottomModal that is active
  */
  activeBottomModal?: TBottomModal;
  /**
   * Potential game settings for each game, not in use yet
   */
  gameSettings: TGameSettings;
  /**
   * Set player id to remove before remove
   */
  playerId?: TPlayer["playerId"];
}
