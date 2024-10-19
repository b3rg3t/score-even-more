import { TGameSettings } from "../type/gameSettings/TGameSettings";
import { TPlayer } from "../type/TPlayer";

export interface ICreateGameExtended extends TGameSettings {
    players?: TPlayer[];
  }
  