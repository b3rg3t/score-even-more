import { memo } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { TRound } from "../../../models/type/TRound";
import {
  removeOneRound,
  selectPlayersProfile,
  selectRoundById,
  setRoundLock,
} from "../../../store/reducers/game/gameSlice";
import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import { RoundForm } from "./RoundForm";
import { text } from "../../../localization/eng";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import { toLocalTime } from "../../utils/ToLocalTime";

interface IRoundItem {
  listItem?: boolean;
  roundPos: number;
  roundId: TRound["roundId"];
  isLatestRound: boolean;
}

export const RoundItem = memo(
  ({ listItem = true, roundPos, roundId, isLatestRound }: IRoundItem) => {
    const round = useAppSelector(selectRoundById(roundId));
    const dispatch = useAppDispatch();
    const players = useAppSelector(selectPlayersProfile);

    const handleRemoveRound = () => {
      dispatch(removeOneRound(roundId));
    };

    const handleLockedRound = () => {
      dispatch(setRoundLock(roundId));
    };

    const shouldBeHidden = isLatestRound ? false : true;

    const content = () => {
      if (!round) {
        return <></>;
      }
      return (
        <>
          <div className="d-flex mb-1 justify-content-between">
            <div className="d-flex align-items-center">
              <span className="badge rounded-pill text-bg-info text-white">
                {roundPos + 1}
              </span>
              <button
                type="button"
                title={text.button.removeRound}
                className="btn py-0 px-1 d-flex text-danger"
                onClick={handleRemoveRound}
                disabled={round.isRoundLocked && !isLatestRound}
              >
                <FaTrashAlt />
              </button>
              <span className="font-sm fw-bold">
                {toLocalTime(round.created)}
              </span>
            </div>
            {shouldBeHidden && (
              <div>
                <button
                  type="button"
                  title={
                    !round.isRoundLocked ? text.round.locked : text.round.unlock
                  }
                  className="btn py-0"
                  onClick={handleLockedRound}
                >
                  {round.isRoundLocked ? <FaLock /> : <FaLockOpen />}
                </button>
              </div>
            )}
          </div>
          <ul className="list-unstyled gap-1 d-flex flex-column">
            {players.map((player) => (
              <RoundForm
                key={player.playerId}
                roundId={round.roundId}
                player={player}
                isRoundLocked={isLatestRound ? false : round.isRoundLocked}
              />
            ))}
          </ul>
        </>
      );
    };

    if (!listItem) {
      return (
        <div className={`w-100 h-100 px-1 py-1 bg-light`}>
          {content()}
        </div>
      );
    }
    return (
      <li
        className={`border rounded px-1 py-1 bg-light shadow ${
          round?.isNew ? "fade-in" : ""
        }`}
      >
        {content()}
      </li>
    );
  }
);
