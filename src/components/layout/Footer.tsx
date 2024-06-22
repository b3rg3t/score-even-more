import { FaPlus } from "react-icons/fa";
import { useAppDispatch } from "../../store/redux/hooks";
import { addOneRound } from "../../store/reducers/game/gameSlice";
import { text } from "../../localization/eng";

export const Footer = () => {
  const dispatch = useAppDispatch();
  const handleAddRoundClick = () => {
    dispatch(addOneRound());
  };
  return (
    <div className="footer sticky-bottom border-top shadow text-white p-1 d-flex justify-content-center">
      <button onClick={handleAddRoundClick} className="footer__btn btn btn-info text-white flex-column py-1 px-1">
        <FaPlus />
        <span className="footer__text">{text.rounds.addRoundButton}</span>
      </button>
    </div>
  );
};
