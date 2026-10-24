import { FC } from "react";
import { text } from "../../localization/eng";
import { DrawerActions, DrawerContent } from "../drawer/DrawerLayout";

interface IModalRestartGameContent {
  handleRestartGame: () => void;
  handleCloseDrawer: () => void;
}

export const ModalRestartGameContent: FC<IModalRestartGameContent> = ({
  handleRestartGame,
  handleCloseDrawer,
}) => (
  <DrawerContent>
    <p className="text-white">{text.footer.restartGame.content}</p>
    <DrawerActions>
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
        onClick={handleCloseDrawer}
      >
        {text.button.cancel}
      </button>
    </DrawerActions>
  </DrawerContent>
);
