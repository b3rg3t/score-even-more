import { Controller, useForm } from "react-hook-form";
import { TGameSettings } from "../../../models/type/gameSettings/TGameSettings";
import { text } from "../../../localization/eng";
import Select from "react-select";
import { gameTypeOptions } from "../../../data/gameTypeOptions";
import { InputWrapper } from "../../form/InputWrapper";
import { ECreateGameForm } from "../../../models/enum/ECreateGameForm";

const formText = text.gameSettings.form;

export const CreateGame = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TGameSettings>({
    defaultValues: {
      gameName: "",
      calcScoreBy: 0,
      scoreToWin: 0,
      maxScorePerRound: null,
      gameType: null,
    },
  });

  const onSubmit = (data: TGameSettings) => {
    console.log(data);
  };

  console.log(errors)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper
        label={formText[ECreateGameForm.GAME_NAME]}
        error={errors?.[ECreateGameForm.GAME_NAME]}
      >
        <input
          className="form-control"
          type="text"
          {...register(ECreateGameForm.GAME_NAME, { required: true })}
        />
      </InputWrapper>
      <InputWrapper
        label={formText[ECreateGameForm.GAME_TYPE]}
        error={errors?.[ECreateGameForm.GAME_TYPE]}
      >
        <Controller
          name={ECreateGameForm.GAME_TYPE}
          control={control}
          render={({ field: { onChange, value, name, ref } }) => (
            <Select
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
        label={formText[ECreateGameForm.CALC_SCORE_BY]}
        error={errors?.[ECreateGameForm.CALC_SCORE_BY]}
      >
        <input
          className="form-control"
          {...register(ECreateGameForm.CALC_SCORE_BY)}
        />
      </InputWrapper>
      <InputWrapper
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
        label={formText[ECreateGameForm.MAX_SCORE_PER_ROUND]}
        error={errors?.[ECreateGameForm.MAX_SCORE_PER_ROUND]}
      >
        <input
          className="form-control"
          type="number"
          {...register(ECreateGameForm.MAX_SCORE_PER_ROUND)}
        />
      </InputWrapper>
      <button>Submit</button>
    </form>
  );
};
