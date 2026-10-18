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
    className="list-group-item d-flex align-items-center gap-2 py-2 text-dark"
  >
    <div className="d-flex align-items-center gap-1 flex-grow-1 ">
      <UserImage size={20} icon={player.icon} border />
      {player.name}
    </div>
    <Counter value={player.totalScore} />
  </li>
);
