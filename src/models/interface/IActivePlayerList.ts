import { TPlayer } from "../type/players/TPlayer";

export interface IActivePlayerList {
    onRemovePlayer: (playerId: TPlayer["playerId"]) => void;
    playerList: TPlayer[]
}