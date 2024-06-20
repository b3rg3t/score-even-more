import { FaMinus, FaPlus } from "react-icons/fa";
import { PLAYER } from "../../models/player";
import { ROUND } from "../../models/round";
import { UserImage } from "../shared/UserImage";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import { RootState } from "../../store/redux/store";
import { scoreAdded } from "../../store/reducers/rounds/roundsSlice";
// import { scoreAdded } from "../../store/reducers/rounds/roundsSlice";

interface IRoundForm {
  roundId: ROUND["roundId"];
  player: PLAYER;
}

export const RoundForm = ({ roundId, player }: IRoundForm) => {
  const selectRound = useAppSelector((state: RootState) =>
    state.game.rounds.find((round) => round.roundId === roundId)
  );
  const dispatch = useAppDispatch();
  
  const handleSetScore = (value: number) => {
    dispatch(
      scoreAdded({
        roundId,
        score: { player: player.playerId, score: value },
      })
    );
  };

  return (
    <li className="round-form d-flex text-white align-items-center justify-content-between border p-1 rounded">
      <div className="d-flex align-content-center">
        <UserImage />
        {player.name}
      </div>
      <div className="d-flex gap-1">
        <button
          className="btn btn-outline-info btn-sm text-white"
          onClick={() => handleSetScore(-1)}
        >
          <FaMinus />
        </button>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: 30 }}
        >
          {selectRound?.score?.[player.playerId] ?? 0}
        </div>
        <button
          className="btn btn-outline-info btn-sm text-white"
          onClick={() => handleSetScore(1)}
        >
          <FaPlus />
        </button>
      </div>
    </li>
  );
};
