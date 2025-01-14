import { useForm } from "react-hook-form";
import { text } from "../../../localization/eng";
import { ECreateGameForm } from "../../../models/enum/ECreateGameForm";
import { selectActiveGame } from "../../../store/reducers/game/gameSlice";
import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import { InputWrapper } from "../../form/InputWrapper";
import { TGameSettings } from "../../../models/type/gameSettings/TGameSettings";
import { ChangePlayerOrder } from "./ChangePlayerOrder";

export const EditGameSettings = () => {
  const dispatch = useAppDispatch();
  const activeGame = useAppSelector(selectActiveGame);
  const { gameName, calcScoreBy, scoreToWin, maxScorePerRound, gameType } =
    activeGame.gameSettings!;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TGameSettings>({
    defaultValues: {
      gameName,
      calcScoreBy,
      scoreToWin,
      maxScorePerRound,
      gameType,
    },
  });

  const className = "form-control";

  const onSubmit = (data: TGameSettings) => {
    // dispatch(createGameAction(data));
    // callBackFunction && callBackFunction();
  };

  const onCancelForm = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper
        label={text.gameSettings.form[ECreateGameForm.GAME_NAME]}
        name={ECreateGameForm.GAME_NAME}
        error={errors?.[ECreateGameForm.GAME_NAME]}
      >
        <input className={className} {...register(ECreateGameForm.GAME_NAME)} />
      </InputWrapper>
      <ChangePlayerOrder />
      <div className="py-2 d-flex gap-2">
        <button className="btn btn-primary" type="submit">
          {text.button.update}
        </button>
        <button
          className="btn btn-outline-primary text-white"
          onClick={onCancelForm}
          type="button"
        >
          {text.button.cancel}
        </button>
      </div>
    </form>
  );
};
