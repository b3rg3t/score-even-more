import { useState, ReactNode, FC } from "react";
import { createPortal } from "react-dom";
import { FaBurger } from "react-icons/fa6";
import "./portal.style.css";
import { PortalMenu } from "./PortalMenu";
import { text } from "../../localization/eng";

export interface IPortal {
  slideIn?: "left" | "right";
  portalWidth?: number;
  menuHeader: string;
  children: ReactNode;
}

export const Portal: FC<IPortal> = (props) => {
  const {
    slideIn = "right",
    portalWidth = 300,
    children,
    ...otherPorps
  } = props;
  const [displayPortal, setDisplayPortal] = useState<boolean>(false);

  const handleOpenMenu = () => {
    setDisplayPortal(true);
  };

  return (
    <>
      {!displayPortal && (
        <button
          title={text.button.openMenu}
          type="button"
          aria-label="open menu"
          className={`btn text-white py-0 px-2`}
          onClick={() => handleOpenMenu()}
        >
          <FaBurger />
        </button>
      )}
      {createPortal(
        <div
          className={`portal__menu shadow ${
            displayPortal ? "portal-active" : ""
          } portal__menu-${slideIn ?? "right"}`}
          style={{ width: portalWidth }}
          aria-hidden={!displayPortal}
          aria-live="assertive"
        >
          <PortalMenu
            displayPortal={displayPortal}
            setDisplayPortal={setDisplayPortal}
            {...otherPorps}
          >
            {children}
          </PortalMenu>
        </div>,
        document.body
      )}
    </>
  );
};
