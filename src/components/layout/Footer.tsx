import { FaPlus } from "react-icons/fa";
import { useAppDispatch } from "../../store/redux/hooks";
import { addOneRound, clearRounds } from "../../store/reducers/game/gameSlice";
import { text } from "../../localization/eng";
import { ImUsers } from "react-icons/im";
import { MdGames, MdOutlineRestartAlt } from "react-icons/md";
import {
  BottomModal,
  IBottomModal,
  IBottomModalRef,
} from "../bottomModal/BottomModal";
import { useRef, useState } from "react";
import { PlayerList } from "../playerList/PlayerList";
import { ModalRestartGameContent } from "../modal/modalContent/ModalRestartGameContent";
import { FooterButton } from "./FooterButton";
import { FaGamepad } from "react-icons/fa6";
import { CreateGame } from "../game/createGameForm/CreateGameForm";
import { GameList } from "../game/gameList/GameList";
import { isMobileSafari } from "react-device-detect";

const { showPlayerList, addRoundButton, restartGame, showGames, createGame } =
  text.footer;

export type ModalTypes =
  | "showPlayers"
  | "restartGame"
  | "createGame"
  | "showGames";

export const Footer = () => {
  const [modalContent, setModalContent] = useState<ModalTypes>("showPlayers");
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
    if (modalContent === "createGame") {
      return {
        header: "Create new game",
        modalHeight: "90%",
        children: <CreateGame callBackFunction={handleCloseBottomModal} />,
      };
    } else if (modalContent === "showPlayers") {
      return {
        header: "Player list",
        children: <PlayerList />,
      };
    } else if (modalContent === "restartGame") {
      return {
        header:
          "Are you sure you want to restart the game, all score will be lost?",
        modalHeight: 150,
        children: (
          <ModalRestartGameContent
            handleRestartGame={handleRestartGame}
            handleCloseBottomModal={handleCloseBottomModal}
          />
        ),
      };
    } else if (modalContent === "showGames") {
      return {
        header: "Games",
        children: <GameList callBackFunction={handleCloseBottomModal} />,
      };
    }
    return {
      header: "",
      children: <></>,
    };
  };

  const handelOpenBottomModal = (type: ModalTypes) => {
    setModalContent(type);
    buttonRef.current?.openBottomModal();
  };

  const handleCloseBottomModal = () => {
    buttonRef.current?.closeBottomModal();
  };

  isMobileSafari
  return (
    <>
      <BottomModal
        ref={buttonRef}
        modalHeight={500}
        {...renderModalContent()}
      />
      <div className={`footer bg-dark sticky-bottom border-top shadow text-white p-1 d-flex justify-content-around ${isMobileSafari ? "pb-3" : ""}`}>
        <FooterButton
          modalType="createGame"
          text={createGame}
          handelOpenBottomModal={handelOpenBottomModal}
          icon={<MdGames />}
        />
        <FooterButton
          modalType="showPlayers"
          text={showPlayerList}
          handelOpenBottomModal={handelOpenBottomModal}
          icon={<ImUsers />}
        />
        <button
          title={text.button.addRound}
          className="footer__btn btn btn-info text-white flex-column py-1 px-1 d-flex gap-1"
          onClick={handleAddRoundClick}
        >
          <FaPlus />
          <span className="footer__text">{addRoundButton}</span>
        </button>
        <FooterButton
          modalType="showGames"
          text={showGames}
          handelOpenBottomModal={handelOpenBottomModal}
          icon={<FaGamepad />}
        />
        <FooterButton
          modalType="restartGame"
          text={restartGame}
          handelOpenBottomModal={handelOpenBottomModal}
          icon={<MdOutlineRestartAlt />}
        />
      </div>
    </>
  );
};
