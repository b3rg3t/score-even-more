export type TRound = {
    roundId: string;
    players: string[];
    round: number;
    created: string;
    score?: any
    isEditing?: boolean;
    isAnswered?: boolean;
}