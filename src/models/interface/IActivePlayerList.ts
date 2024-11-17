import { TPlayer } from "../type/TPlayer";

export interface IActivePlayerList {
    onRemovePlayer: (playerId: TPlayer["playerId"]) => void;
    playerList: TPlayer[]
}