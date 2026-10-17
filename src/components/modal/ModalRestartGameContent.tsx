import { FC } from "react";
import { text } from "../../localization/eng";
import {
  BottomModalActions,
  BottomModalContent,
} from "../bottomModal/BottomModalLayout";

interface IModalRestartGameContent {
  handleRestartGame: () => void;
  handleCloseBottomModal: () => void;
}

export const ModalRestartGameContent: FC<IModalRestartGameContent> = ({
  handleRestartGame,
  handleCloseBottomModal,
}) => (
  <BottomModalContent>
    <p className="text-white">{text.footer.restartGame.content}</p>
    <BottomModalActions>
      <button
        title={text.button.restartGame}
        className="btn btn-primary"
        onClick={handleRestartGame}
      >
        {text.button.yes}
      </button>
      <button
        title={text.button.close}
        className="btn btn-outline-primary text-white"
        onClick={handleCloseBottomModal}
      >
        {text.button.cancel}
      </button>
    </BottomModalActions>
  </BottomModalContent>
);
