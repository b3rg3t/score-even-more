import {
  CSSProperties,
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  useImperativeHandle,
  useState,
} from "react";
import { createPortal } from "react-dom";
import "./bottomModal.style.scss";
import { BottomModalMenu } from "./BottomModalMenu";

export interface IBottomModal {
  modalHeight?: number | string;
  children?: ReactNode;
  header?: string;
}
export interface IBottomModalRef {
  openBottomModal: () => void;
  closeBottomModal: () => void;
}

export const BottomModal: ForwardRefExoticComponent<
  IBottomModal & React.RefAttributes<IBottomModalRef>
> = forwardRef<IBottomModalRef, IBottomModal>((props, ref) => {
  const { modalHeight, children } = props;

  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState(0);

  useImperativeHandle(
    ref,
    () => ({
      openBottomModal: () => setDisplayModal(true),
      closeBottomModal: () => setDisplayModal(false),
    }),
    [],
  );

  return (
    <>
      {createPortal(
        <div
          className={`bottomModal__menu shadow ${
            displayModal ? "bottomModal-active" : "bottomModal__menu-bottom"
          }${dragOffset > 0 ? " bottomModal-dragging" : ""}`}
          style={
            modalHeight === undefined && dragOffset === 0
              ? undefined
              : ({
                  ...(modalHeight === undefined
                    ? {}
                    : {
                        "--bottom-modal-min-height":
                          typeof modalHeight === "number"
                            ? `${modalHeight}px`
                            : modalHeight,
                      }),
                  ...(dragOffset > 0
                    ? { transform: `translateY(${dragOffset}px)` }
                    : {}),
                } as CSSProperties)
          }
          aria-hidden={!displayModal}
          aria-live="assertive"
        >
          <BottomModalMenu
            {...props}
            displayModal={displayModal}
            setDisplayModal={setDisplayModal}
            onDragOffsetChange={setDragOffset}
          >
            {children}
          </BottomModalMenu>
        </div>,
        document.body,
      )}
    </>
  );
});
