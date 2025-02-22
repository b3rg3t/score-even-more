import { FaPlus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import {
  addOneRound,
  clearRounds,
  selectActiveBottomModal,
  setActiveBottomModal,
} from "../../store/reducers/game/gameSlice";
import { text } from "../../localization/eng";
import { ImUsers } from "react-icons/im";
import { MdGames, MdOutlineRestartAlt } from "react-icons/md";
import {
  BottomModal,
  IBottomModal,
  IBottomModalRef,
} from "../bottomModal/BottomModal";
import { useRef } from "react";
import { PlayerList } from "../playerList/PlayerList";
import { ModalRestartGameContent } from "../modal/modalContent/ModalRestartGameContent";
import { FooterButton } from "./FooterButton";
import { FaGamepad } from "react-icons/fa6";
import { CreateGame } from "../game/createGameForm/CreateGameForm";
import { GameList } from "../game/gameList/GameList";
import { isMobileSafari, isSafari } from "react-device-detect";
import { TBottomModal } from "../../models/type/TBottomModal";
import { ModalDeletePlayer } from "../modal/modalContent/ModalDeletePlayer";

const {
  showPlayerList,
  addRoundButton,
  restartGame,
  showGames,
  createGame,
  deletePlayer,
} = text.footer;

export const Footer = () => {
  const activeBottomModal = useAppSelector(selectActiveBottomModal);
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
    switch (activeBottomModal) {
      case "createGame":
        return {
          header: createGame.header,
          modalHeight: "90%",
          children: <CreateGame callBackFunction={handleCloseBottomModal} />,
        };
      case "showPlayers":
        return {
          header: showPlayerList.header,
          children: <PlayerList />,
        };
      case "restartGame":
        return {
          header: restartGame.header,
          modalHeight: 150,
          children: (
            <ModalRestartGameContent
              handleRestartGame={handleRestartGame}
              handleCloseBottomModal={handleCloseBottomModal}
            />
          ),
        };
      case "showGames": {
        return {
          header: showGames.header,
          children: <GameList callBackFunction={handleCloseBottomModal} />,
        };
      }
      case "deletePlayer": {
        return {
          header: deletePlayer.header,
          modalHeight: 260,
          children: <ModalDeletePlayer />,
        };
      }
      default:
        return {
          header: "",
          children: <></>,
        };
    }
  };

  const handelOpenBottomModal = (type: TBottomModal) => {
    dispatch(setActiveBottomModal(type));
    buttonRef.current?.openBottomModal();
  };

  const handleCloseBottomModal = () => {
    buttonRef.current?.closeBottomModal();
  };

  return (
    <>
      <BottomModal
        ref={buttonRef}
        modalHeight={500}
        {...renderModalContent()}
      />
      <div
        className={`footer bg-dark sticky-bottom border-top shadow text-white p-1 d-flex justify-content-around ${
          isMobileSafari || isSafari ? "pb-4" : "pb-2"
        }`}
      >
        <FooterButton
          modalType="createGame"
          text={createGame.button}
          handelOpenBottomModal={handelOpenBottomModal}
          icon={<MdGames />}
        />
        <FooterButton
          modalType="showPlayers"
          text={showPlayerList.button}
          handelOpenBottomModal={handelOpenBottomModal}
          icon={<ImUsers />}
        />
        <button
          title={text.button.addRound}
          className="footer__btn btn btn-info text-white flex-column py-1 px-1 d-flex gap-1"
          onClick={handleAddRoundClick}
        >
          <FaPlus />
          <span className="footer__text">{addRoundButton.button}</span>
        </button>
        <FooterButton
          modalType="showGames"
          text={showGames.button}
          handelOpenBottomModal={handelOpenBottomModal}
          icon={<FaGamepad />}
        />
        <FooterButton
          modalType="restartGame"
          text={restartGame.button}
          handelOpenBottomModal={handelOpenBottomModal}
          icon={<MdOutlineRestartAlt />}
        />
      </div>
    </>
  );
};
