import {
  CSSProperties,
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  useImperativeHandle,
  useState,
} from "react";
import { createPortal } from "react-dom";
import "./drawer.style.scss";
import { DrawerMenu } from "./DrawerMenu";

export interface IDrawer {
  modalHeight?: number | string;
  children?: ReactNode;
  header?: string;
}
export interface IDrawerRef {
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const Drawer: ForwardRefExoticComponent<
  IDrawer & React.RefAttributes<IDrawerRef>
> = forwardRef<IDrawerRef, IDrawer>((props, ref) => {
  const { modalHeight, children } = props;

  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState(0);

  useImperativeHandle(
    ref,
    () => ({
      openDrawer: () => setDisplayModal(true),
      closeDrawer: () => setDisplayModal(false),
    }),
    [],
  );

  return (
    <>
      {createPortal(
        <div
          className={`drawer__menu shadow ${
            displayModal ? "drawer-active" : "drawer__menu-bottom"
          }${dragOffset > 0 ? " drawer-dragging" : ""}`}
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
          <DrawerMenu
            {...props}
            displayModal={displayModal}
            setDisplayModal={setDisplayModal}
            onDragOffsetChange={setDragOffset}
          >
            {children}
          </DrawerMenu>
        </div>,
        document.body,
      )}
    </>
  );
});
