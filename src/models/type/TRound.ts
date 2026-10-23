export type TRound = {
  roundId: string;
  round: number;
  created: number;
  score?: Record<string, number>;
  devilHorns?: Record<string, boolean>;
  isEditing?: boolean;
  isAnswered?: boolean;
  isRoundLocked?: boolean;
  isNew?: boolean;
};
