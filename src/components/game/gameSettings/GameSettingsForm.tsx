import { useForm } from "react-hook-form";
import { TGameSettings } from "../../../models/type/gameSettings/TGameSettings";
import { gameSettingsDefaultValues } from "../../../data/gameSettingsDefaultValues";
import { text } from "../../../localization/eng";

const { calcByScore, scoreToWin, maxScorePerRound } = text.gameSettings.form;

export const GameSettingsForm = () => {
  const { register, handleSubmit } = useForm<TGameSettings>({
    defaultValues: gameSettingsDefaultValues,
  });

  const onSubmit = (data: TGameSettings) => {
    console.log(data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-2">
      <label htmlFor="calcScoreBy" className="text-white">{calcByScore}</label>
      <input className="form-control" type="number" {...register("calcScoreBy")} />

      <label htmlFor="scoreToWin" className="text-white">{scoreToWin}</label>
      <input className="form-control" type="number" {...register("scoreToWin")} />

      <label htmlFor="maxScorePerRound" className="text-white">{maxScorePerRound}</label>
      <input className="form-control" type="number" {...register("maxScorePerRound")} />
    </form>
  );
};
