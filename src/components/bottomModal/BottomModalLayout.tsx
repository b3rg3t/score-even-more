import { FC, ReactNode } from "react";

interface IBottomModalLayout {
  children: ReactNode;
}

export const BottomModalContent: FC<IBottomModalLayout> = ({ children }) => (
  <div className="bottomModal__child">{children}</div>
);

export const BottomModalActions: FC<IBottomModalLayout> = ({ children }) => (
  <div className="bottomModal__actions">{children}</div>
);
