import { UserImage } from "../../shared/UserImage";
import { Counter } from "../counter/Counter";

interface IScoreBoardPlayer {
  player: { name?: string; playerId: string; totalScore: number };
}

export const ScoreBoardPlayer = ({ player }: IScoreBoardPlayer) => (
  <li
    key={player.playerId}
    className="d-flex align-items-start border-bottom pb-1"
  >
    <div className="d-flex align-items-center">
      <UserImage size={20} />
      {player.name}:
    </div>
    <Counter value={player.totalScore} />
  </li>
);
