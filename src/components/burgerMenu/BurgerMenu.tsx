import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";

interface IBurgerMenu {
  width: number;
}

export const BurgerMenu = ({ width }: IBurgerMenu) => {
  const [isOpen, setIsOpen] = useState(false);

  const backDrop = useRef<HTMLDivElement>(null);

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
      {isOpen &&
        createPortal(
          <div ref={backDrop} className="modal-container">
            <div
              className="modal-container__content p-1"
              style={{ width: width ?? 30 }}
            >
              <div className="d-flex justify-content-between">
                <h2>This is a modal</h2>
                <button
                  className="btn"
                  onClick={() => setIsOpen((prevState) => !prevState)}
                >
                  <FaTimes />
                </button>
              </div>
              <br />
              <p>This is the modal description</p>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
