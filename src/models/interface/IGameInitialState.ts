import { EntityId } from "@reduxjs/toolkit";
import { TRound } from "../type/TRound";
import { TGameTypeOption } from "../type/TGameTypeOptions";

export interface IGameInitialState {
    gameId: string;
    playerIds: EntityId[];
    rounds: TRound[];
    displayUsers: boolean;
    gameType?: TGameTypeOption;
  }