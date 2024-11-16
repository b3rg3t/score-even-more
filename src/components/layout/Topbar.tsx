import { FaFlagCheckered } from "react-icons/fa";

import { GameSettings } from "../game/gameSettings/GameSettings";
import { Portal } from "../portal/Portal";
import { text } from "../../localization/eng";
import { useAppSelector } from "../../store/redux/hooks";
import { selectGameName } from "../../store/reducers/game/gameSlice";

export const Topbar = () => {
  const gameName = useAppSelector(selectGameName);

  const headerText = text.appName.split(" ");
  return (
    <header className="bg-dark border-bottom d-flex sticky-top justify-content-between text-white px-1 pt-1 pb-2">
      <div className="d-flex align-items-end">
        <h1 className="d-flex align-items-center me-1 mb-0">
          <FaFlagCheckered className="me-2" size={24} />
          <div className="d-flex flex-column display-4">
            {headerText.map((header) => (
              <span className="header-h1 fw-bold">{header}</span>
            ))}
          </div>
        </h1>
        <span>- {gameName}</span>
      </div>
      <Portal menuHeader="Settings">
        <GameSettings />
      </Portal>
    </header>
  );
};
