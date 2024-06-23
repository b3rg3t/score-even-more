import React, { FC, useState } from "react";
import { createPortal } from "react-dom";
import { FaCog, FaTimes } from "react-icons/fa";

interface IBurgerMenu {
  width: number;
  modalHeader: string;
  children: React.ReactElement;
}

export const BurgerMenu: FC<IBurgerMenu> = ({
  modalHeader,
  width,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="burgerMenu">
      <button
        className="btn gap-1 d-flex flex-column"
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <span className="burgerMenu__bars" />
        <span className="burgerMenu__bars" />
        <span className="burgerMenu__bars" />
      </button>
      {createPortal(
        <div
          onClick={() => setIsOpen(false)}
          className={`modal-container ${isOpen ? "m-c__open" : "m-c__closed"} `}
        >
          <div
            className={`modal-container__content p-2  ${
              isOpen ? "m-c__c__open" : "m-c__c__closed"
            }`}
            onClick={(e) => {
              e.stopPropagation();
            }}
            style={{ width: width ?? 30 }}
          >
            <div className="d-flex justify-content-between">
              <h2 className="text-white">
                <FaCog className="me-1" />
                {modalHeader}
              </h2>
              <button
                className="btn text-white"
                onClick={() => setIsOpen((prevState) => !prevState)}
              >
                <FaTimes />
              </button>
            </div>
            {children}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
