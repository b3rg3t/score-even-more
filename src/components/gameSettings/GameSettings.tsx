import Select, { SingleValue } from "react-select";
import { gameTypeOptions } from "../../data/gameTypeOptions";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import {
  selectGameType,
  setGameType,
} from "../../store/reducers/game/gameSlice";
import { TGameTypeOption } from "../../models/type/TGameTypeOptions";
export const GameSettings = () => {
  const dispatch = useAppDispatch();
  const gameType = useAppSelector(selectGameType);

  const handleSelectGameType = (newValue: SingleValue<TGameTypeOption>) => {
    dispatch(setGameType(newValue as TGameTypeOption));
  };
  return (
    <section>
      <label className="w-100">
        Type of game
        <Select
          onChange={handleSelectGameType}
          value={gameType}
          options={gameTypeOptions}
        />
      </label>
    </section>
  );
};
