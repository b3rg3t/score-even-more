import { FC } from "react";
import { text } from "../../../localization/eng";

interface IModalRestartGameContent {
  handleRestartGame: () => void;
  handleCloseBottomModal: () => void;
}

export const ModalRestartGameContent: FC<IModalRestartGameContent> = ({
  handleRestartGame,
  handleCloseBottomModal,
}) => (
  <div className="d-flex justify-content-center gap-2 flex-grow-1 align-items-center">
    <button className="btn btn-primary" onClick={handleRestartGame}>
      {text.button.yes}
    </button>
    <button className="btn btn-outline-light" onClick={handleCloseBottomModal}>
      {text.button.cancel}
    </button>
  </div>
);