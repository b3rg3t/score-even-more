import { TGameSettings } from "../type/gameSettings/TGameSettings";
import { TPlayer } from "../type/TPlayer";

export interface ICreateGame extends TGameSettings {
    players: TPlayer[];
  }
  