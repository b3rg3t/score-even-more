import { useForm } from "react-hook-form";
import { text } from "../../../localization/eng";
import { ECreateGameForm } from "../../../models/enum/ECreateGameForm";
import { selectActiveGame, updateGameSettings } from "../../../store/reducers/game/gameSlice";
import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import { InputWrapper } from "../../form/InputWrapper";
import { TGameSettings } from "../../../models/type/gameSettings/TGameSettings";
import { AdvancedSettings } from "../form/AdvancedSettings";

const formText = text.gameSettings.createGameForm;

export const EditGameSettings = () => {
  const dispatch = useAppDispatch();
  const activeGame = useAppSelector(selectActiveGame);
  const {
    gameName,
    calcScoreBy,
    scoreToWin,
    maxScorePerRound,
    gameType,
    lockOnNewRound,
  } = activeGame.gameSettings!;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<TGameSettings>({
    defaultValues: {
      gameName,
      calcScoreBy,
      scoreToWin,
      maxScorePerRound,
      gameType,
      lockOnNewRound,
    },
  });

  const className = "form-control";

  const onSubmit = (data: TGameSettings) => {
     dispatch(updateGameSettings(data));
    // callBackFunction && callBackFunction();
  };

  const onCancelForm = () => {
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="d-flex flex-column gap-2"
    >
      <InputWrapper
        label={formText[ECreateGameForm.GAME_NAME]}
        name={ECreateGameForm.GAME_NAME}
        error={errors?.[ECreateGameForm.GAME_NAME]}
      >
        <input className={className} {...register(ECreateGameForm.GAME_NAME)} />
      </InputWrapper>
      <AdvancedSettings register={register} control={control} errors={errors} />
      <div className="py-2 d-flex gap-2">
        <button className="btn btn-primary" type="submit">
          {text.button.update}
        </button>
        <button
          className="btn btn-outline-primary text-white"
          onClick={onCancelForm}
          type="button"
        >
          {text.button.reset}
        </button>
      </div>
    </form>
  );
};
