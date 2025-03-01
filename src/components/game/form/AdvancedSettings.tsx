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
import { Accordion } from "../../accordion/Accordion";

const formText = text.gameSettings.createGameForm;

interface IAdvancedSettings {
  register: UseFormRegister<ICreateGameExtended>;
  control: Control<ICreateGameExtended, any>;
  errors?: FieldErrors<ICreateGameExtended>;
}

export const AdvancedSettings: FC<IAdvancedSettings> = ({
  register,
  errors,
}) => {
  return (
    <Accordion
      id="advanced-settings"
      className="d-flex flex-column gap-2"
      title={text.gameSettings.advancedSettings}
    >
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
      <InputWrapper
        name={ECreateGameForm.SLIDE_ROUND}
        label={formText[ECreateGameForm.SLIDE_ROUND]}
        error={errors?.[ECreateGameForm.SLIDE_ROUND]}
        checkbox
      >
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          {...register(ECreateGameForm.SLIDE_ROUND)}
        />
      </InputWrapper>
    </Accordion>
  );
};
