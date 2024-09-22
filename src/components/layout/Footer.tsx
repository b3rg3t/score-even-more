import { FaPlus } from "react-icons/fa";
import { useAppDispatch } from "../../store/redux/hooks";
import { addOneRound, clearRounds } from "../../store/reducers/game/gameSlice";
import { text } from "../../localization/eng";
import { ImUsers } from "react-icons/im";
import { MdOutlineRestartAlt } from "react-icons/md";
import {
  BottomModal,
  IBottomModal,
  IBottomModalRef,
} from "../bottomModal/BottomModal";
import { useRef, useState } from "react";
import { PlayerList } from "../playerList/PlayerList";
import { ModalRestartGameContent } from "../modal/modalContent/ModalRestartGameContent";

const { showPlayerList, addRoundButton, restartGame } = text.footer;

export const Footer = () => {
  const [modalContent, setModalContent] = useState<
    "showPlayers" | "restartGame"
  >("showPlayers");
  const dispatch = useAppDispatch();
  const handleAddRoundClick = () => {
    dispatch(addOneRound());
  };

  const buttonRef = useRef<IBottomModalRef>(null);

  const handleRestartGame = () => {
    dispatch(clearRounds());
    buttonRef.current?.closeBottomModal();
  };

  const renderModalContent = (): Partial<IBottomModal> => {
    if (modalContent === "showPlayers") {
      return {
        header: "Player list",
        children: <PlayerList />,
      };
    } else if (modalContent === "restartGame") {
      return {
        header:
          "Are you sure you want to restart the game, all score will be lost?",
        modalHeight: 130,
        children: (
          <ModalRestartGameContent
            handleRestartGame={handleRestartGame}
            handleCloseBottomModal={handleCloseBottomModal}
          />
        ),
      };
    }
    return {
      header: "",
      children: <></>,
    };
  };

  const handelOpenBottomModal = (type: "showPlayers" | "restartGame") => {
    setModalContent(type);
    buttonRef.current?.openBottomModal();
  };

  const handleCloseBottomModal = () => {
    buttonRef.current?.closeBottomModal();
  };

  return (
    <>
      <BottomModal
        // @ts-ignore
        ref={buttonRef}
        modalHeight={500}
        {...renderModalContent()}
      />
      <div className="footer sticky-bottom border-top shadow text-white p-1 d-flex justify-content-around">
        <button
          className="btn btn-outline-info border-0 text-white flex-column"
          onClick={() => handelOpenBottomModal("showPlayers")}
        >
          <ImUsers />
          <span className="footer__text">{showPlayerList}</span>
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
          onClick={() => handelOpenBottomModal("restartGame")}
        >
          <MdOutlineRestartAlt />
          <span className="footer__text">{restartGame}</span>
        </button>
      </div>
    </>
  );
};
