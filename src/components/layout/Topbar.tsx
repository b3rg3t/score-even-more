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

const { header, deleteGame } = text.header;

export const Topbar = () => {
  const gameName = useAppSelector(selectGameName);
  const dispatch = useAppDispatch();

  const modalRef = useRef<IBottomModalRef>(null);

  const handleDeleteGame = () => {
    dispatch(setDeleteGame());
    modalRef.current?.openBottomModal();
  };

  return (
    <>
      <BottomModal ref={modalRef} modalHeight={200} header={deleteGame}>
        <ModalDeleteGame modalRef={modalRef} />
      </BottomModal>
      <header className="bg-dark border-bottom d-flex sticky-top justify-content-between text-white px-1 pt-1 pb-2">
        <div className="d-flex align-items-end overflow-hidden position-relative">
          <img src={logo} width={32} height="auto" />
          <div className="w-100 text-truncate pe-1">
            {gameName && <span className="fw-bold ">{gameName}</span>}
          </div>
        </div>

        <div className="d-flex gap-2">
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
