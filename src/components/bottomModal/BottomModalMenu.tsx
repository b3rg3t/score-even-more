import React, { FC, ReactNode, useCallback, useEffect, useRef } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { IBottomModal } from "./BottomModal";
import { text } from "../../localization/eng";

interface IBottomModalMenu extends Omit<
  IBottomModal,
  "modalHeight" | "children"
> {
  displayModal: boolean;
  setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>;
  onDragOffsetChange: (offset: number) => void;
  children: ReactNode;
}

export const BottomModalMenu: FC<IBottomModalMenu> = ({
  displayModal,
  setDisplayModal,
  onDragOffsetChange,
  children,
  header,
}) => {
  const wrapperDivRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number | null>(null);
  const dragOffset = useRef(0);

  const handleOnMenuClose = useCallback(() => {
    setDisplayModal(false);
  }, [setDisplayModal]);

  const handleDragStart = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!displayModal || event.button !== 0) {
      return;
    }

    dragStartY.current = event.clientY;
    dragOffset.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  const handleDragMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartY.current === null) {
      return;
    }

    dragOffset.current = Math.max(0, event.clientY - dragStartY.current);
    onDragOffsetChange(dragOffset.current);
  };

  const handleDragEnd = () => {
    if (dragStartY.current === null) {
      return;
    }

    if (dragOffset.current >= 100) {
      handleOnMenuClose();
    }

    dragStartY.current = null;
    dragOffset.current = 0;
    onDragOffsetChange(0);
  };

  const handleDragCancel = () => {
    dragStartY.current = null;
    dragOffset.current = 0;
    onDragOffsetChange(0);
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        wrapperDivRef.current &&
        !wrapperDivRef.current.contains(event.target as Node)
      ) {
        handleOnMenuClose();
      }
    },
    [handleOnMenuClose],
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    if (displayModal) {
      wrapperDivRef!.current!.focus();
    }
  }, [displayModal]);

  return (
    <div
      ref={wrapperDivRef}
      className="bottomModal__inner d-flex flex-column w-100 pb-4 position-relative"
    >
      <div className="d-flex justify-content-center py-2 position-relative">
        <div
          className="bottomModal__dragHandle"
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragCancel}
        />
        <button
          type="button"
          title={text.button.close}
          className="bottomModal__close-btn btn px-2 text-white position-absolute"
          onClick={handleOnMenuClose}
        >
          <FaTimesCircle />
        </button>
      </div>
      <header className="d-flex justify-content-between w-100 mb-2 px-2">
        <h3 className="text-white display-3 fw-bold">{header}</h3>
      </header>
      <div className="bottomModal__content px-2 flex-grow-1">{children}</div>
    </div>
  );
};
