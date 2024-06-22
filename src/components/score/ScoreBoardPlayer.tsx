import { PLAYER } from "../../models/player";
import { useAppSelector } from "../../store/redux/hooks";
import { selectScoreByPlayer } from "../../store/reducers/rounds/roundsSlice";
import { UserImage } from "../shared/UserImage";
import { Counter } from "../counter/Counter";

interface IScoreBoardPlayer {
  player: PLAYER;
}

export const ScoreBoardPlayer = ({ player }: IScoreBoardPlayer) => {
  const totalScore = useAppSelector(selectScoreByPlayer);
  return (
    <li
      key={player.playerId}
      className="d-flex align-items-start border-bottom pb-1"
    >
      <div className="d-flex align-items-center">
        <UserImage size={20} />
        {player.name}: 
      </div><Counter value={totalScore[player.playerId]} />
    </li>
  );
};
