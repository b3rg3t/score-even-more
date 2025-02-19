import { FC, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { TPlayer } from "../../../models/type/players/TPlayer";
import { TRound } from "../../../models/type/TRound";
import { UserImage } from "../../shared/UserImage";
import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import {
  scoreAdded,
  selectRoundById,
} from "../../../store/reducers/game/gameSlice";
import { text } from "../../../localization/eng";
import { RoundInput } from "./RoundInput";

interface IRoundForm {
  roundId: TRound["roundId"];
  player: TPlayer;
  isRoundLocked?: boolean;
}

export const RoundForm: FC<IRoundForm> = ({
  roundId,
  player,
  isRoundLocked,
}) => {
  const [displayInput, setDisplayInput] = useState<boolean>(false);
  const selectRound = useAppSelector(selectRoundById(roundId));

  const dispatch = useAppDispatch();

  const handleUpdateScore = (value: number) => {
    dispatch(
      scoreAdded({
        roundId,
        score: { player: player.playerId, score: value },
      })
    );
  };

  const width = 48;
  const score = selectRound?.score?.[player.playerId] ?? 0;

  const handleOnClick = () => {
    if (!isRoundLocked) {
      setDisplayInput(true);
    }
  };

  return (
    <li className="bg-dark d-flex text-white align-items-center justify-content-between border p-1 rounded">
      <div className="d-flex align-items-center">
        <UserImage icon={player.icon} />
        {player.name}
      </div>
      <div className="d-flex gap-1">
        <button
          title={text.button.decrease}
          className="btn btn-outline-info btn-sm text-white"
          onClick={() => handleUpdateScore(-1)}
          disabled={isRoundLocked}
        >
          <FaMinus />
        </button>
        {displayInput ? (
          <RoundInput
            score={score}
            playerId={player.playerId}
            roundId={roundId}
            inputWidth={width}
            onCloseInput={() => setDisplayInput(false)}
          />
        ) : (
          <div
            onClick={handleOnClick}
            className="d-flex justify-content-center align-items-center"
            style={{ width: 48 }}
          >
            {score}
          </div>
        )}
        <button
          title={text.button.increase}
          className="btn btn-outline-info btn-sm text-white"
          onClick={() => handleUpdateScore(1)}
          disabled={isRoundLocked}
        >
          <FaPlus />
        </button>
      </div>
    </li>
  );
};
