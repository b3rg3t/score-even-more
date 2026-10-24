import { FaPlus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import {
  addOneRound,
  clearRounds,
  selectActiveDrawer,
  setActiveDrawer,
} from "../../store/reducers/game/gameSlice";
import { text } from "../../localization/eng";
import { ImUsers } from "react-icons/im";
import { MdGames, MdOutlineRestartAlt } from "react-icons/md";
import { Drawer, IDrawer, IDrawerRef } from "../drawer/Drawer";
import { useRef } from "react";
import { PlayerList } from "../playerList/PlayerList";
import { ModalRestartGameContent } from "../modal/ModalRestartGameContent";
import { FooterButton } from "./FooterButton";
import { FaGamepad } from "react-icons/fa6";
import { GameList } from "../game/gameList/GameList";
import { isMobileSafari, isSafari } from "react-device-detect";
import { TDrawer } from "../../models/type/TDrawer";
import { ModalDeletePlayer } from "../modal/ModalDeletePlayer";
import { CreateGame } from "../game/gameSettings/CreateGameForm";

const {
  showPlayerList,
  addRoundButton,
  restartGame,
  showGames,
  createGame,
  deletePlayer,
} = text.footer;

export const Footer = () => {
  const activeDrawer = useAppSelector(selectActiveDrawer);
  const dispatch = useAppDispatch();
  const handleAddRoundClick = () => {
    dispatch(addOneRound());
  };

  const buttonRef = useRef<IDrawerRef>(null);

  const handleRestartGame = () => {
    dispatch(clearRounds());
    buttonRef.current?.closeDrawer();
  };

  const renderModalContent = (): Partial<IDrawer> => {
    switch (activeDrawer) {
      case "createGame":
        return {
          header: createGame.header,
          modalHeight: "90%",
          children: <CreateGame callBackFunction={handleCloseDrawer} />,
        };
      case "showPlayers":
        return {
          header: showPlayerList.header,
          children: <PlayerList onGameSelect={handleCloseDrawer} />,
        };
      case "restartGame":
        return {
          header: restartGame.button,
          modalHeight: 150,
          children: (
            <ModalRestartGameContent
              handleRestartGame={handleRestartGame}
              handleCloseDrawer={handleCloseDrawer}
            />
          ),
        };
      case "showGames": {
        return {
          header: showGames.header,
          children: <GameList callBackFunction={handleCloseDrawer} />,
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

  const handelOpenDrawer = (type: TDrawer) => {
    dispatch(setActiveDrawer(type));
    buttonRef.current?.openDrawer();
  };

  const handleCloseDrawer = () => {
    buttonRef.current?.closeDrawer();
  };

  return (
    <>
      <Drawer ref={buttonRef} {...renderModalContent()} />
      <footer
        className={`footer bg-dark flex-shrink-0 border-top shadow-sm text-white p-2 pt-1 d-flex justify-content-around ${
          isMobileSafari || isSafari ? "pb-3" : "pb-1"
        }`}
      >
        <FooterButton
          modalType="createGame"
          text={createGame.button}
          handelOpenDrawer={handelOpenDrawer}
          icon={<MdGames />}
        />
        <FooterButton
          modalType="showPlayers"
          text={showPlayerList.button}
          handelOpenDrawer={handelOpenDrawer}
          icon={<ImUsers />}
        />
        <button
          title={text.button.addRound}
          className="footer__btn footer__btn--add-round btn flex-column d-flex gap-1"
          onClick={handleAddRoundClick}
        >
          <FaPlus size={20} />
          <span className="footer__text">{addRoundButton.button}</span>
        </button>
        <FooterButton
          modalType="showGames"
          text={showGames.button}
          handelOpenDrawer={handelOpenDrawer}
          icon={<FaGamepad />}
        />
        <FooterButton
          modalType="restartGame"
          text={restartGame.button}
          handelOpenDrawer={handelOpenDrawer}
          icon={<MdOutlineRestartAlt />}
        />
      </footer>
    </>
  );
};
