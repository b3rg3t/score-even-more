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
      type="button"
      className="border-0 rounded-3 text-white flex-column d-flex gap-1 bg-transparent pt-1"
      style={{
        background: "transparent",
        boxShadow: "none",
        outline: "none",
      }}
      onClick={() => handelOpenBottomModal(modalType)}
    >
      {icon}
      <span className="footer__text">{text}</span>
    </button>
  );
};
