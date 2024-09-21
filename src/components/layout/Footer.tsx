import { FaPlus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import {
  addOneRound,
  clearRounds,
  selectDisplayUsers,
  setDisplayUsers,
} from "../../store/reducers/game/gameSlice";
import { text } from "../../localization/eng";
import { ImUsers } from "react-icons/im";
import { MdOutlineRestartAlt } from "react-icons/md";

const { hidePlayerList, showPlayerList, addRoundButton, restartGame } = text.footer;

export const Footer = () => {
  const displayPlayers = useAppSelector(selectDisplayUsers);
  const dispatch = useAppDispatch();
  const handleAddRoundClick = () => {
    dispatch(addOneRound());
  };

  const handleDislayPlayers = () => {
    dispatch(setDisplayUsers(!displayPlayers));
  };

  return (
    <div className="footer sticky-bottom border-top shadow text-white p-1 d-flex justify-content-around">
      <button
        className="btn btn-outline-info border-0 text-white flex-column"
        onClick={() => handleDislayPlayers()}
      >
        <ImUsers />
        <span className="footer__text">
          {!displayPlayers ? showPlayerList : hidePlayerList}
        </span>
      </button>
      <button
        className="footer__btn btn btn-info text-white flex-column py-1 px-1"
        onClick={handleAddRoundClick}
      >
        <FaPlus />
        <span className="footer__text">{addRoundButton}</span>
      </button>
      <button
        className="btn btn-outline-info border-0 text-white flex-column"
        onClick={() => dispatch(clearRounds())}
      >
        <MdOutlineRestartAlt />
        <span className="footer__text">{restartGame}</span>
      </button>
    </div>
  );
};
