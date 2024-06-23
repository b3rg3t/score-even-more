import { EntityId } from "@reduxjs/toolkit";

export type TRound = {
    roundId: string;
    players: EntityId[];
    round: number;
    created: string;
    score?: any
    isEditing?: boolean;
    isAnswered?: boolean;
}