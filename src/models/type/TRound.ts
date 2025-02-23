export type TRound = {
    roundId: string;
    round: number;
    created: number;
    score?: any
    isEditing?: boolean;
    isAnswered?: boolean;
    isRoundLocked?: boolean;
    isNew?: boolean
}