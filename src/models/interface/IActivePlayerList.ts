import { TPlayer } from "../type/players/TPlayer";

export interface IActivePlayerList {
  onRemovePlayer: (playerId: TPlayer["playerId"]) => void;
  onReorderPlayers?: (playerList: TPlayer[]) => void;
  playerList: TPlayer[];
}
