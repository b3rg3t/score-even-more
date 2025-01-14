import { FaMinus, FaPlus } from "react-icons/fa";
import { TPlayer } from "../../../models/type/TPlayer";
import { TRound } from "../../../models/type/TRound";
import { UserImage } from "../../shared/UserImage";
import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import { RootState } from "../../../store/redux/store";
import { scoreAdded } from "../../../store/reducers/game/gameSlice";
import { text } from "../../../localization/eng";
import { FC } from "react";

interface IRoundForm {
  roundId: TRound["roundId"];
  player: TPlayer;
  isRoundLocked?: boolean;
}

export const RoundForm: FC<IRoundForm> = ({ roundId, player, isRoundLocked }) => {
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
          title={text.button.decrease}
          className="btn btn-outline-info btn-sm text-white"
          onClick={() => handleSetScore(-1)}
          disabled={isRoundLocked}
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
          title={text.button.increase}
          className="btn btn-outline-info btn-sm text-white"
          onClick={() => handleSetScore(1)}
          disabled={isRoundLocked}
        >
          <FaPlus />
        </button>
      </div>
    </li>
  );
};
