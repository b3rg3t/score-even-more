import { FC, ReactNode } from "react";
import { TBottomModal } from "../../models/type/TBottomModal";

interface IFooterButton {
  modalType: TBottomModal;
  text: string;
  icon: ReactNode;
  handelOpenBottomModal: (modalType: TBottomModal) => void;
}

export const FooterButton: FC<IFooterButton> = ({
  modalType,
  text,
  icon,
  handelOpenBottomModal,
}) => {
  return (
    <button
      className="btn btn-outline-info border-0 text-white flex-column d-flex gap-1"
      onClick={() => handelOpenBottomModal(modalType)}
    >
      {icon}
      <span className="footer__text">{text}</span>
    </button>
  );
};
