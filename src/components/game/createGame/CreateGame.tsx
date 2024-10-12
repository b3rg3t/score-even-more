import { Controller, useForm } from "react-hook-form";

import { text } from "../../../localization/eng";
import Select from "react-select";
import { gameTypeOptions } from "../../../data/gameTypeOptions";
import { InputWrapper } from "../../form/InputWrapper";
import { ECreateGameForm } from "../../../models/enum/ECreateGameForm";
import { SelectPlayers } from "./SelectPlayers";
import { ICreateGame } from "../../../models/interface/ICreateGame";
import { formatString } from "../../../helpers/stringFormat";

const formText = text.gameSettings.form;

export const CreateGame = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ICreateGame>({
    defaultValues: {
      gameName: "",
      calcScoreBy: 0,
      scoreToWin: 0,
      maxScorePerRound: null,
      gameType: null,
    },
  });

  const onSubmit = (data: ICreateGame) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper
        name={ECreateGameForm.GAME_NAME}
        label={formText[ECreateGameForm.GAME_NAME]}
        error={errors?.[ECreateGameForm.GAME_NAME]}
      >
        <input
          className="form-control"
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
          control={control}
          playerValues={watch(ECreateGameForm.PLAYERS)}
        />
      </InputWrapper>
      <InputWrapper
        name={ECreateGameForm.GAME_TYPE}
        label={formText[ECreateGameForm.GAME_TYPE]}
        error={errors?.[ECreateGameForm.GAME_TYPE]}
      >
        <Controller
          name={ECreateGameForm.GAME_TYPE}
          control={control}
          render={({ field: { onChange, value, name, ref } }) => (
            <Select
              className="form-width"
              name={name}
              ref={ref}
              value={value}
              onChange={onChange}
              options={gameTypeOptions}
            />
          )}
        />
      </InputWrapper>
      <InputWrapper
        name={ECreateGameForm.CALC_SCORE_BY}
        label={formText[ECreateGameForm.CALC_SCORE_BY]}
        error={errors?.[ECreateGameForm.CALC_SCORE_BY]}
      >
        <input
          className="form-control"
          {...register(ECreateGameForm.CALC_SCORE_BY)}
        />
      </InputWrapper>
      <InputWrapper
        name={ECreateGameForm.SCORE_TO_WIN}
        label={formText[ECreateGameForm.SCORE_TO_WIN]}
        error={errors?.[ECreateGameForm.SCORE_TO_WIN]}
      >
        <input
          className="form-control"
          type="number"
          {...register("scoreToWin")}
        />
      </InputWrapper>
      <InputWrapper
        name={ECreateGameForm.MAX_SCORE_PER_ROUND}
        label={formText[ECreateGameForm.MAX_SCORE_PER_ROUND]}
        error={errors?.[ECreateGameForm.MAX_SCORE_PER_ROUND]}
      >
        <input
          className="form-control"
          type="number"
          {...register(ECreateGameForm.MAX_SCORE_PER_ROUND)}
        />
      </InputWrapper>
      <div className="py-2">
        <button className="btn btn-primary" type="submit">
          {text.button.submit}
        </button>
      </div>
    </form>
  );
};
