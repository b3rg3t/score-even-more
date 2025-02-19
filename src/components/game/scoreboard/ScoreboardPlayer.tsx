import { FC } from "react";
import { UserImage } from "../../shared/UserImage";
import { Counter } from "../counter/Counter";
import { EPlayerIcon } from "../../../models/enum/EPlayerIcon";

interface IScoreboardPlayer {
  player: {
    name?: string;
    playerId: string;
    icon?: EPlayerIcon;
    totalScore: number;
  };
}

export const ScoreboardPlayer: FC<IScoreboardPlayer> = ({
  player,
}: IScoreboardPlayer) => (
  <li
    key={player.playerId}
    className="d-flex align-items-start border-bottom pb-1"
  >
    <div className="d-flex align-items-center">
      <UserImage size={20} icon={player.icon} />
      {player.name}:
    </div>
    <Counter value={player.totalScore} />
  </li>
);
