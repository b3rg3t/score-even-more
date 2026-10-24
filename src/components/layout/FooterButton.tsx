import { FC, ReactNode } from "react";
import { TDrawer } from "../../models/type/TDrawer";

interface IFooterButton {
  modalType: TDrawer;
  text: string;
  icon: ReactNode;
  handelOpenDrawer: (modalType: TDrawer) => void;
}

export const FooterButton: FC<IFooterButton> = ({
  modalType,
  text,
  icon,
  handelOpenDrawer,
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
      onClick={() => handelOpenDrawer(modalType)}
    >
      {icon}
      <span className="footer__text">{text}</span>
    </button>
  );
};
