import { FC } from "react";
import { formatString } from "../../helpers/stringFormat";
import { text } from "../../localization/eng";
import {
  removeGameById,
  selectActiveGameId,
  selectGameName,
} from "../../store/reducers/game/gameSlice";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import { IDrawerRef } from "../drawer/Drawer";
import { DrawerActions, DrawerContent } from "../drawer/DrawerLayout";

const { content } = text.modal.deleteGame;

interface IModalDeleteGame {
  modalRef: React.RefObject<IDrawerRef | null>;
}

export const ModalDeleteGame: FC<IModalDeleteGame> = ({ modalRef }) => {
  const dispatch = useAppDispatch();
  const activeGameId = useAppSelector(selectActiveGameId);

  const gameName = useAppSelector(selectGameName);

  const handleRemoveGame = () => {
    dispatch(removeGameById(activeGameId));
    modalRef.current?.closeDrawer();
  };

  const handleCancel = () => {
    modalRef.current?.closeDrawer();
  };

  return (
    <DrawerContent>
      <p className="text-white">{formatString(content, gameName)}</p>
      <DrawerActions>
        <button
          className="btn btn-danger"
          type="button"
          onClick={handleRemoveGame}
        >
          {text.button.removeGame}
        </button>
        <button
          className="btn btn-outline-primary text-white"
          type="button"
          onClick={handleCancel}
        >
          {text.button.cancel}
        </button>
      </DrawerActions>
    </DrawerContent>
  );
};
