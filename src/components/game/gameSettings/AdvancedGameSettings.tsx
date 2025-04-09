import { FC } from "react";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { ICreateGameExtended } from "../../../models/interface/ICreateGame";
import { Accordion } from "../../accordion/Accordion";
import { text } from "../../../localization/eng";
import { InputWrapper } from "../../form/InputWrapper";
import { ECreateGameForm } from "../../../models/enum/ECreateGameForm";
import { FaGamepad } from "react-icons/fa";

interface IAdvancedGameSettings {
  register: UseFormRegister<ICreateGameExtended>;
  control: Control<ICreateGameExtended, any>;
  errors?: FieldErrors<ICreateGameExtended>;
}

const { createGameForm, advancedGameSettings } = text.gameSettings;

export const AdvancedGameSettings: FC<IAdvancedGameSettings> = ({
  register,
  errors,
}) => {
  return (
    <Accordion
      id="advanced-game-settings"
      className="d-flex flex-column gap-2"
      title={advancedGameSettings}
      icon={<FaGamepad />}
    >
      <InputWrapper
        label={createGameForm.startScore}
        name={ECreateGameForm.START_SCORE}
        error={errors?.[ECreateGameForm.START_SCORE]}
      >
        <input
          className="form-control"
          type="number"
          {...register(ECreateGameForm.START_SCORE, { valueAsNumber: true })}
        />
      </InputWrapper>
      <InputWrapper
        label={createGameForm.loseBy}
        name={ECreateGameForm.LOSE_BY}
        error={errors?.[ECreateGameForm.LOSE_BY]}
      >
        <input
          className="form-control"
          type="number"
          {...register(ECreateGameForm.LOSE_BY, { valueAsNumber: true })}
        />
      </InputWrapper>
      <InputWrapper
        label={createGameForm.maxScorePerRound}
        name={ECreateGameForm.MAX_SCORE_PER_ROUND}
        error={errors?.[ECreateGameForm.MAX_SCORE_PER_ROUND]}
      >
        <input
          className="form-control"
          type="number"
          {...register(ECreateGameForm.MAX_SCORE_PER_ROUND, {
            valueAsNumber: true,
          })}
        />
      </InputWrapper>
      <InputWrapper
        label={createGameForm.scoreToWin}
        name={ECreateGameForm.SCORE_TO_WIN}
        error={errors?.[ECreateGameForm.SCORE_TO_WIN]}
      >
        <input
          className="form-control"
          type="number"
          {...register(ECreateGameForm.SCORE_TO_WIN, { valueAsNumber: true })}
        />
      </InputWrapper>
      <InputWrapper
        label={createGameForm.calcScoreBy}
        name={ECreateGameForm.CALC_SCORE_BY}
        error={errors?.[ECreateGameForm.CALC_SCORE_BY]}
      >
        <input
          className="form-control"
          type="number"
          {...register(ECreateGameForm.CALC_SCORE_BY, { valueAsNumber: true })}
        />
      </InputWrapper>
    </Accordion>
  );
};
