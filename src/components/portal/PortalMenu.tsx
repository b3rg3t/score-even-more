import { FC, useEffect, useRef } from "react";
import { IPortal } from "./Portal";
import { FaTimesCircle } from "react-icons/fa";

interface IPortalMenu extends Omit<IPortal, "slideIn" | "portalWidth"> {
  displayPortal: boolean;
  setDisplayPortal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PortalMenu: FC<IPortalMenu> = ({
  menuHeader,
  displayPortal,
  setDisplayPortal,
  children,
}) => {
  const wrapperDivRef = useRef<HTMLDivElement>(null);

  const handleOnMenuClose = () => {
    setDisplayPortal(false);
  };

  const handleClickOutside = (event: any) => {
    if (
      wrapperDivRef.current &&
      !wrapperDivRef.current.contains(event.target)
    ) {
      handleOnMenuClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (displayPortal) {
      wrapperDivRef!.current!.focus();
    }
  }, [displayPortal]);

  return (
    <div
      ref={wrapperDivRef}
      className="w-100 h-100 d-flex flex-column position-relative px-2"
      tabIndex={-1}
    >
      <header className="d-flex bg-green text-white justify-content-between align-items-center gap-4 py-2 border-bottom">
        <h2>
          <small>{menuHeader ?? "Menu"}</small>
        </h2>
        <button className="btn px-2 text-white" onClick={handleOnMenuClose}>
          <FaTimesCircle />
        </button>
      </header>
      <div className="flex-grow-1 d-flex flex-column justify-content-between overflow-hidden">
        {children}
      </div>
    </div>
  );
};
