import { FC, useState, useRef, useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { TPlayer } from "../../../models/type/TPlayer";
import { TRound } from "../../../models/type/TRound";
import { UserImage } from "../../shared/UserImage";
import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import { RootState } from "../../../store/redux/store";
import {
  scoreAdded,
  setScoreByValue,
} from "../../../store/reducers/game/gameSlice";
import { text } from "../../../localization/eng";

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
  const [inputScore, setInputScore] = useState<string>("");
  const selectRound = useAppSelector((state: RootState) =>
    state.game.activeGame.rounds.find((round) => round.roundId === roundId)
  );

  const dispatch = useAppDispatch();
  
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpdateScore = (value: number) => {
    dispatch(
      scoreAdded({
        roundId,
        score: { player: player.playerId, score: value },
      })
    );
  };

  const handleSetScore = (value: string) => {
    let score = 0;
    console.log({ value });
    if (value && typeof value === "string") {
      score = parseInt(value);
    }
    dispatch(
      setScoreByValue({
        roundId,
        score: { player: player.playerId, score: score },
      })
    );
  };

  const handleClickOutside = (event: any) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      handleSetScore(inputScore);
      setDisplayInput(false);
    }
  };

  useEffect(() => {
    console.log("here?")
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleOnClick = () => {
    const score = selectRound?.score?.[player.playerId] ?? 0;
    setDisplayInput(true);
    setInputScore(score.toString());
    setTimeout(() => {
      inputRef!.current!.focus();
    }, 100);
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    handleSetScore(e.currentTarget.elements.score.value);
    setDisplayInput(false)
  };
  const handleOnChange =(event: React.ChangeEvent<HTMLInputElement >) => {
    setInputScore(event.target.value)
  }

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
          onClick={() => handleUpdateScore(-1)}
          disabled={isRoundLocked}
        >
          <FaMinus />
        </button>
        {displayInput ? (
          <form onSubmit={handleSubmit}>
            <input
              name="score"
              type="number"
              ref={inputRef}
              value={inputScore}
              max={999}
              onChange={handleOnChange}
              className="form-control px-1"
              style={{ height: 24, width: 48 }}
            />
          </form>
        ) : (
          <div
            onClick={handleOnClick}
            className="d-flex justify-content-center align-items-center"
            style={{ width: 48 }}
          >
            {selectRound?.score?.[player.playerId] ?? 0}
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
