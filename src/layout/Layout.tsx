import { FC, ReactNode } from "react";
import { Outlet } from "react-router";

interface ILayout {
  children: ReactNode;
}

export const Layout: FC<ILayout> = ({ children }) => (
  <>
    {children}
    <Outlet />
  </>
);
