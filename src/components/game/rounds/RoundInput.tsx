import { FC, useEffect, useRef, useState } from "react";
import { TRound } from "../../../models/type/TRound";
import { useAppDispatch } from "../../../store/redux/hooks";
import { setScoreByValue } from "../../../store/reducers/game/gameSlice";
import { TPlayer } from "../../../models/type/TPlayer";
import { text } from "../../../localization/eng";

interface IRoundInput {
  score: number;
  roundId: TRound["roundId"];
  playerId: TPlayer["playerId"];
  inputWidth: number;
  onCloseInput: () => void;
}

export const RoundInput: FC<IRoundInput> = ({
  score,
  roundId,
  playerId,
  inputWidth,
  onCloseInput,
}) => {
  const [inputScore, setInputScore] = useState<string>(score + "");
  const [error, setError] = useState<boolean>(false)
  const dispatch = useAppDispatch();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef!.current!.focus();
    }, 100);
  });

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        buttonRef.current?.click();
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [inputScore]);

  const handleSetScore = (value?: string) => {
    let currentScore = 0;
    if (value && typeof value === "string") {
      currentScore = parseInt(value);
    }

    if(currentScore > 999){
        setError(true)
    }

    dispatch(
      setScoreByValue({
        roundId,
        score: { player: playerId, score: currentScore },
      })
    );
    onCloseInput();
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(error){
        setError(false)
    }
    setInputScore(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      score: { value: string };
    };

    handleSetScore(formElements.score.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        aria-label={text.round.input}
        name="score"
        type="number"
        ref={inputRef}
        value={inputScore}
        min={-999}
        max={999}
        onChange={handleOnChange}
        className="form-control px-1"
        style={{ height: 24, width: inputWidth }}
      />
      <button className="d-none" ref={buttonRef} type="submit"></button>
    </form>
  );
};
