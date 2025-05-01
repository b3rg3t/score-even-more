import { FC } from "react";
import { text } from "../../localization/eng";
import { copyGameToNewGame } from "../../store/reducers/game/gameSlice";
import { useAppDispatch } from "../../store/redux/hooks";
import { LuCopyPlus } from "react-icons/lu";

interface ICopyGame {
  callbackFunc?: () => void;
}

export const CopyGame: FC<ICopyGame> = ({ callbackFunc }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(copyGameToNewGame());
    callbackFunc && callbackFunc();
  };

  return (
    <div className="d-flex flex-column gap-1">
      <span className="text-white">{text.copyGame.label}</span>
      <button
        className="d-flex justify-content-center btn btn-outline-primary text-white gap-2"
        onClick={handleClick}
        type="button"
      >
        <LuCopyPlus />
        {text.button.createNew}
      </button>
    </div>
  );
};
