import { GameSettings } from "../game/gameSettings/GameSettings";
import { Portal } from "../portal/Portal";
import { text } from "../../localization/eng";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import {
  selectGameName,
  setDeleteGame,
  setIsMenuOpen,
} from "../../store/reducers/game/gameSlice";
import { DisplayScoreBoardButton } from "../game/utils/DisplayScoreBoardButton";
import { BottomModal, IBottomModalRef } from "../bottomModal/BottomModal";
import { ModalDeleteGame } from "../modal/ModalDeleteGame";
import { useRef } from "react";
import logo from "../../assets/32x32.png";
import { CopyGame } from "../copyGame/CopyGame";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const { header, deleteGame } = text.header;

export const Topbar = () => {
  const gameName = useAppSelector(selectGameName);
  const dispatch = useAppDispatch();

  const modalRef = useRef<IBottomModalRef | null>(null);

  const handleDeleteGame = () => {
    dispatch(setDeleteGame());
    modalRef.current?.openBottomModal();
  };

  return (
    <>
      <BottomModal ref={modalRef} modalHeight={200} header={deleteGame}>
        <ModalDeleteGame modalRef={modalRef} />
      </BottomModal>
      <header className="bg-dark shadow-sm d-flex flex-shrink-0 align-items-center justify-content-between text-white px-3 py-2">
        <div className="d-flex align-items-center gap-2 overflow-hidden position-relative">
          <img src={logo} width={32} height="auto" alt="" />
          <div className="w-100 text-truncate pe-1">
            {gameName && <span className="fw-semibold">{gameName}</span>}
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <a
            href="https://github.com/b3rg3t"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-white d-flex align-items-center"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/david-berg-385530175"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-white d-flex align-items-center"
          >
            <FaLinkedin size={20} />
          </a>
          <DisplayScoreBoardButton />
          {gameName && (
            <Portal menuHeader={header}>
              <GameSettings />
              <div className="d-flex flex-column gap-2">
                <CopyGame callbackFunc={() => dispatch(setIsMenuOpen(false))} />
                <button
                  type="button"
                  onClick={handleDeleteGame}
                  className="btn btn-outline-danger d-flex justify-content-center mb-4 text-white"
                >
                  {deleteGame}
                </button>
              </div>
            </Portal>
          )}
        </div>
      </header>
    </>
  );
};
