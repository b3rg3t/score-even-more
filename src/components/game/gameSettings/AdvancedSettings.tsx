import { text } from "../../../localization/eng";
import { InputWrapper } from "../../form/InputWrapper";
import { ECreateGameForm } from "../../../models/enum/ECreateGameForm";
import {
  Control,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { ICreateGameExtended } from "../../../models/interface/ICreateGame";
import { FC } from "react";
import { Accordion } from "../../accordion/Accordion";
import { FaCogs } from "react-icons/fa";

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
      icon={<FaCogs />}
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
      <InputWrapper
        name={ECreateGameForm.SIZE_PLAYER}
        label={formText[ECreateGameForm.SIZE_PLAYER]}
        error={errors?.[ECreateGameForm.SIZE_PLAYER]}
        checkbox
      >
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          {...register(ECreateGameForm.SIZE_PLAYER)}
        />
      </InputWrapper>
    </Accordion>
  );
};
