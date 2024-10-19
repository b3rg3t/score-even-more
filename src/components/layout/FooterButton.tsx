import { FC, ReactNode } from "react";
import { ModalTypes } from "./Footer";

interface IFooterButton {
  modalType: ModalTypes;
  text: string;
  icon: ReactNode;
  handelOpenBottomModal: (modalType: ModalTypes) => void;
}

export const FooterButton: FC<IFooterButton> = ({
  modalType,
  text,
  icon,
  handelOpenBottomModal,
}) => {
  return (
    <button
      className="btn btn-outline-info border-0 text-white flex-column"
      onClick={() => handelOpenBottomModal(modalType)}
    >
      {icon}
      <span className="footer__text">{text}</span>
    </button>
  );
};
