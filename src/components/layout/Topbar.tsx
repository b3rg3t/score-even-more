import { FaFlagCheckered } from "react-icons/fa";

import { GameSettings } from "../gameSettings/GameSettings";
import { Portal } from "../portal/Portal";
import { text } from "../../localization/eng";

export const Topbar = () => (
  <header className="topbar border-bottom d-flex sticky-top justify-content-between text-white px-1 pt-1 pb-2">
    <h1 className="d-flex align-items-center">
      <FaFlagCheckered className="me-2" />
      {text.appName}
    </h1>
    <Portal menuHeader="Settings">
      <GameSettings />
    </Portal>
  </header>
);
