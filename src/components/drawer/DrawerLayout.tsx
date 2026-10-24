import { FC, ReactNode } from "react";

interface IDrawerLayout {
  children: ReactNode;
}

export const DrawerContent: FC<IDrawerLayout> = ({ children }) => (
  <div className="drawer__child">{children}</div>
);

export const DrawerActions: FC<IDrawerLayout> = ({ children }) => (
  <div className="drawer__actions">{children}</div>
);
