import { FC } from "react";
import { formatString } from "../../../helpers/stringFormat";
import { text } from "../../../localization/eng";
import {
    removeGameById,
  selectActiveGameId,
  selectGameName,
} from "../../../store/reducers/game/gameSlice";
import { useAppDispatch, useAppSelector } from "../../../store/redux/hooks";
import { IBottomModalRef } from "../../bottomModal/BottomModal";

const { content } = text.modal.deleteGame;

interface IModalDeleteGame {
  modalRef: React.RefObject<IBottomModalRef>;
}

export const ModalDeleteGame: FC<IModalDeleteGame> = ({ modalRef }) => {
  const dispatch = useAppDispatch();
  const activeGameId = useAppSelector(selectActiveGameId);

  const gameName = useAppSelector(selectGameName);

  const handleRemoveGame = () => {
    dispatch(removeGameById(activeGameId));
    modalRef.current?.closeBottomModal();
  };

  const handleCancel = () => {
    modalRef.current?.closeBottomModal();
  };

  return (
    <div className="text-white">
      <p>{formatString(content, gameName)}</p>
      <div className="d-flex gap-2 justify-content-center">
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
      </div>
    </div>
  );
};
