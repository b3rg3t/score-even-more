import { FaFlagCheckered } from "react-icons/fa";

import { GameSettings } from "../gameSettings/GameSettings";
import { Portal } from "../portal/Portal";

export const Topbar = () => (
  <header className="topbar border-bottom d-flex sticky-top justify-content-between text-white px-1 pt-1 pb-2">
    <h1 className="d-flex align-items-center">
      <FaFlagCheckered className="me-2" />
      Score more
    </h1>
    <Portal menuHeader="Settings">
      <GameSettings />
    </Portal>
  </header>
);
