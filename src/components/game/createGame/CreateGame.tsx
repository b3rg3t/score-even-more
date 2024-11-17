import { Controller, useForm } from "react-hook-form";

import { text } from "../../../localization/eng";
import Select from "react-select";
import { gameTypeOptions } from "../../../data/gameTypeOptions";
import { InputWrapper } from "../../form/InputWrapper";
import { ECreateGameForm } from "../../../models/enum/ECreateGameForm";
import { SelectPlayers } from "./SelectPlayers";
import { ICreateGameExtended } from "../../../models/interface/ICreateGame";
import { formatString } from "../../../helpers/stringFormat";
import { useAppDispatch } from "../../../store/redux/hooks";
import { createGameAction } from "../../../store/reducers/combinedAction";
import { FC } from "react";
import { Accordion } from "../accordion/Accordion";

const formText = text.gameSettings.form;

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
      <Accordion
        id="advanced-settings"
        title={text.gameSettings.advancedSettings}
      >
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
      </Accordion>
      <div className="py-2 d-flex gap-2">
        <button className="btn btn-primary" type="submit">
          {text.button.submit}
        </button>
        <button
          className="btn btn-outline-primary text-white"
          onClick={handleCancelForm}
          type="button"
        >
          {text.button.cancel}
        </button>
      </div>
    </form>
  );
};
