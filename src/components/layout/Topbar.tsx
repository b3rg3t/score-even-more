import { GameSettings } from "../game/gameSettings/GameSettings";
import { Portal } from "../portal/Portal";
import { text } from "../../localization/eng";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import {
  selectGameName,
  setDeleteGame,
} from "../../store/reducers/game/gameSlice";
import { DisplayScoreBoardButton } from "../game/utils/DisplayScoreBoardButton";
import { BottomModal, IBottomModalRef } from "../bottomModal/BottomModal";
import { ModalDeleteGame } from "../modal/modalContent/ModalDeleteGame";
import { useRef } from "react";

const { header, deleteGame } = text.header;

export const Topbar = () => {
  const gameName = useAppSelector(selectGameName);
  const dispatch = useAppDispatch();

  const modalRef = useRef<IBottomModalRef>(null);
  const headerText = text.appName.split(" ");

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
        <div className="d-flex align-items-end">
          <h1 className="d-flex align-items-center me-1 mb-0">
            <div className="d-flex flex-column display-4">
              {headerText.map((header, idx) => (
                <span key={idx} className="header-h1 fw-bold">
                  {header}
                </span>
              ))}
            </div>
          </h1>
          {gameName && <span>| {gameName}</span>}
        </div>
        <div className="d-flex gap-2">
          <DisplayScoreBoardButton />
          {gameName && (
            <Portal menuHeader={header}>
              <GameSettings />
              <button
                type="button"
                onClick={handleDeleteGame}
                className="btn btn-outline-danger d-flex justify-content-center mb-4 text-white"
              >
                {deleteGame}
              </button>
            </Portal>
          )}
        </div>
      </header>
    </>
  );
};
