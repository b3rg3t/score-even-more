import { Accordion } from "../accordion/Accordion";
import { text } from "../../../localization/eng";
import { InputWrapper } from "../../form/InputWrapper";
import { ECreateGameForm } from "../../../models/enum/ECreateGameForm";
import {
  Control,
  // Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { ICreateGameExtended } from "../../../models/interface/ICreateGame";
import { FC } from "react";
// import Select from "react-select";
// import { gameTypeOptions } from "../../../data/gameTypeOptions";

const formText = text.gameSettings.createGameForm;

interface IAdvancedSettings {
  register: UseFormRegister<ICreateGameExtended>;
  control: Control<ICreateGameExtended, any>;
  errors?: FieldErrors<ICreateGameExtended>;
}

export const AdvancedSettings: FC<IAdvancedSettings> = ({
  register,
  // control,
  errors,
}) => {
  return (
    <Accordion
      id="advanced-settings"
      className="d-flex flex-column gap-2"
      title={text.gameSettings.advancedSettings}
    >
      {/* <InputWrapper
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
      </InputWrapper> */}
      <InputWrapper
        name={ECreateGameForm.LOCK_ON_NEW_ROUND}
        label={formText[ECreateGameForm.LOCK_ON_NEW_ROUND]}
        error={errors?.[ECreateGameForm.LOCK_ON_NEW_ROUND]}
        checkbox
      >
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          {...register(ECreateGameForm.LOCK_ON_NEW_ROUND)}
        />
      </InputWrapper>
    </Accordion>
  );
};
