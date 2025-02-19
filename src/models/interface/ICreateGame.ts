import { TGameSettings } from "../type/gameSettings/TGameSettings";
import { TPlayer } from "../type/players/TPlayer";

export interface ICreateGameExtended extends TGameSettings {
    players?: TPlayer[];
  }
  