import {
  FC,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useState,
} from "react";
import { createPortal } from "react-dom";
import "./bottomModal.style.css";
import { BottomModalMenu } from "./BottomModalMenu";

export interface IBottomModal {
  modalHeight: number;
  children: ReactNode;
  header: string;
}
export interface IBottomModalRef {
  openBottomModal: () => void;
  closeBottomModal: () => void;
}

export const BottomModal: FC<IBottomModal> = forwardRef<
  IBottomModalRef,
  IBottomModal
>((props, ref) => {
  const { modalHeight = 500, children } = props;

  const [displayModal, setDisplayModal] = useState<boolean>(false);

  useImperativeHandle(
    ref,
    () => ({
      openBottomModal: () => setDisplayModal(true),
      closeBottomModal: () => setDisplayModal(false),
    }),
    []
  );

  return (
    <>
      {createPortal(
        <div
          className={`bottomModal__menu rounded-top shadow ${
            displayModal ? "bottomModal-active" : "bottomModal__menu-bottom"
          }`}
          style={{ height: modalHeight }}
          aria-hidden={!displayModal}
          aria-live="assertive"
        >
          <BottomModalMenu
            {...props}
            displayModal={displayModal}
            setDisplayModal={setDisplayModal}
          >
            {children}
          </BottomModalMenu>
        </div>,
        document.body
      )}
    </>
  );
});
