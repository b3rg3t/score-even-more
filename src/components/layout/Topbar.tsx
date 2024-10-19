import { FaFlagCheckered } from "react-icons/fa";

import { GameSettings } from "../game/gameSettings/GameSettings";
import { Portal } from "../portal/Portal";
import { text } from "../../localization/eng";
import { useAppSelector } from "../../store/redux/hooks";
import { selectGameName } from "../../store/reducers/game/gameSlice";

export const Topbar = () => {
  const gameName = useAppSelector(selectGameName);
  return (
    <header className="topbar border-bottom d-flex sticky-top justify-content-between text-white px-1 pt-1 pb-2">
      <div className="d-flex align-items-end">
        <h1 className="d-flex align-items-center me-1">
          <FaFlagCheckered className="me-2" />
          {text.appName}
        </h1>
        <span>- {gameName}</span>
      </div>
      <Portal menuHeader="Settings">
        <GameSettings />
      </Portal>
    </header>
  );
};
