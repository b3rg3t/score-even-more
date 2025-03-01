import { useForm } from "react-hook-form";

import { text } from "../../../localization/eng";
import { gameTypeOptions } from "../../../data/gameTypeOptions";
import { InputWrapper } from "../../form/InputWrapper";
import { ECreateGameForm } from "../../../models/enum/ECreateGameForm";
import { SelectPlayers } from "./SelectPlayers";
import { ICreateGameExtended } from "../../../models/interface/ICreateGame";
import { formatString } from "../../../helpers/stringFormat";
import { useAppDispatch } from "../../../store/redux/hooks";
import { createGameAction } from "../../../store/reducers/combinedAction";
import { FC } from "react";
import { AdvancedSettings } from "../form/AdvancedSettings";

const formText = text.gameSettings.createGameForm;

interface ICreateGame {
  callBackFunction?: () => void;
}

export const CreateGame: FC<ICreateGame> = ({ callBackFunction }) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm<ICreateGameExtended>({
    defaultValues: {
      gameName: "",
      calcScoreBy: 0,
      scoreToWin: 0,
      maxScorePerRound: null,
      gameType: gameTypeOptions[0],
      lockOnNewRound: true,
      slideRound: false,
      playerSize: false
    },
  });

  const onSubmit = (data: ICreateGameExtended) => {
    dispatch(createGameAction(data));
    callBackFunction && callBackFunction();
  };

  const handleCancelForm = () => {
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="d-flex flex-column gap-2"
    >
      <InputWrapper
        name={ECreateGameForm.GAME_NAME}
        label={formText[ECreateGameForm.GAME_NAME]}
        error={errors?.[ECreateGameForm.GAME_NAME]}
      >
        <input
          className="form-control"
          placeholder={text.gameSettings.gameName.placeholder}
          type="text"
          {...register(ECreateGameForm.GAME_NAME, {
            required: { value: true, message: text.formValidation.required },
            minLength: {
              value: 1,
              message: formatString(text.formValidation.minValueText, "1"),
            },
            maxLength: {
              value: 20,
              message: formatString(text.formValidation.maxValueText, "20"),
            },
          })}
        />
      </InputWrapper>
      <InputWrapper
        name={ECreateGameForm.PLAYERS}
        label={formText[ECreateGameForm.PLAYERS]}
        error={errors?.[ECreateGameForm.PLAYERS]}
      >
        <SelectPlayers
          setValue={setValue}
          getValues={getValues}
          control={control}
          playerValues={watch(ECreateGameForm.PLAYERS)}
        />
      </InputWrapper>
      <AdvancedSettings register={register} control={control} errors={errors} />
      <div className="py-2 d-flex gap-2">
        <button className="btn btn-primary" type="submit">
          {text.button.submit}
        </button>
        <button
          className="btn btn-outline-primary text-white"
          onClick={handleCancelForm}
          type="button"
        >
          {text.button.reset}
        </button>
      </div>
    </form>
  );
};
