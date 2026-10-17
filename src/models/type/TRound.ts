export type TRound = {
  roundId: string;
  round: number;
  created: number;
  score?: Record<string, number>;
  isEditing?: boolean;
  isAnswered?: boolean;
  isRoundLocked?: boolean;
  isNew?: boolean;
};
