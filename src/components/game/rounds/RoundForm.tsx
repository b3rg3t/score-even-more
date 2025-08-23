import { FC, useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { TPlayer } from "../../../models/type/players/TPlayer";
import { TRound } from "../../../models/type/TRound";
import { UserImage } from "../../shared/UserImage";
import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import {
  scoreAdded,
  selectPlayerSize,
  selectRoundById,
} from "../../../store/reducers/game/gameSlice";
import { text } from "../../../localization/eng";
import { RoundInput } from "./RoundInput";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../lib/firebase/init-firebase";
import { ECollection } from "../../../models/enum/ECollection";
import { useStoreDispatch } from "../../hooks/useStoreDispatch";

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
  const [playerScore, setPlayerScore] = useState<number>(0);
  const { addScore } = useStoreDispatch();
  // const selectRound = useAppSelector(selectRoundById(roundId));
  const playerSize = useAppSelector(selectPlayerSize);

  const roundRef = collection(db, ECollection.GAMES);

  const handleUpdateScore = (value: number) => {
    addScore(value, player.playerId, roundId);
  };

  useEffect(() => {
    // Listen for changes to the game document that contains the round
    const q = query(roundRef);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        const round = data.rounds?.find((r: any) => r.roundId === roundId);
        if (round) {
          setPlayerScore(round.score[player.playerId] || 0);
        }
      });
    });
    return () => unsubscribe();
  }, []);

  const width = 48;
  const score = playerScore ?? 0;

  const handleOnClick = () => {
    if (!isRoundLocked) {
      setDisplayInput(true);
    }
  };

  return (
    <li
      className={`bg-dark d-flex text-white align-items-center justify-content-between border p-1 rounded ${
        playerSize ? "p-2" : "p-1"
      }`}
    >
      <div className="d-flex align-items-center">
        <UserImage icon={player.icon} />
        <span className={`${playerSize ? "ms-1" : ""}`}>{player.name}</span>
      </div>
      <div className="d-flex gap-1">
        <button
          title={text.button.decrease}
          className={`btn btn-outline-info text-white ${
            !playerSize ? "btn-sm" : ""
          }`}
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
            playerSize={playerSize}
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
          className={`btn btn-outline-info text-white ${
            !playerSize ? "btn-sm" : ""
          }`}
          onClick={() => handleUpdateScore(1)}
          disabled={isRoundLocked}
        >
          <FaPlus />
        </button>
      </div>
    </li>
  );
};
