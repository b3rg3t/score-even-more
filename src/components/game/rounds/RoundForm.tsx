import { FaMinus, FaPlus } from "react-icons/fa";
import { TPlayer } from "../../../models/type/TPlayer";
import { TRound } from "../../../models/type/TRound";
import { UserImage } from "../../shared/UserImage";
import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import { RootState } from "../../../store/redux/store";
import { scoreAdded } from "../../../store/reducers/game/gameSlice";

interface IRoundForm {
  roundId: TRound["roundId"];
  player: TPlayer;
}

export const RoundForm = ({ roundId, player }: IRoundForm) => {
  const selectRound = useAppSelector((state: RootState) =>
    state.game.activeGame.rounds.find((round) => round.roundId === roundId)
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
    <li className="bg-dark d-flex text-white align-items-center justify-content-between border p-1 rounded">
      <div className="d-flex align-items-center">
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
