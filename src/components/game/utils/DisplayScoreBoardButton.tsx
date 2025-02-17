import { useAppDispatch } from "../../../store/redux/hooks";
import { text } from "../../../localization/eng";
import { setGameFinished } from "../../../store/reducers/game/gameSlice";
import { FaFlagCheckered } from "react-icons/fa6";

export const DisplayScoreBoardButton = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      title={text.button.finish}
      className="btn btn-outline-info text-white py-1"
      onClick={() => dispatch(setGameFinished())}
    >
      <FaFlagCheckered />
    </button>
  );
};
