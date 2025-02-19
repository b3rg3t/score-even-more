import { EPlayerIcon } from "../../enum/EPlayerIcon";

export type TPlayer = {
  /**
   * Unique id for each player
   */
  playerId: string;
  /**
   * Name of player
   */
  name: string;
  /**
   * Needed for react-select create
   */
  label?: string;
  /**
   * Needed for react-select create
   */
  value?: string;
  /**
   * Icon for player
   */
  icon?: EPlayerIcon;
};
