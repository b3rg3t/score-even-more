import { FaUserGraduate } from "react-icons/fa";
import { FC } from "react";
import { playerIcons } from "../../data/PlayerIcons";
import { TPlayer } from "../../models/type/players/TPlayer";

interface IUserImage {
  icon?: TPlayer["icon"];
  size?: number;
  border?: boolean;
}

export const UserImage: FC<IUserImage> = ({ icon, size, border = false }) => {
  const playerIcon = playerIcons.find((i) => i.name === icon);

  return (
    <div
      className={`p-1 bg-white text-black rounded-circle d-flex justify-content-center align-items-center me-1 ${border ? "border border-secondary" : ""}`}
      style={{ width: size ?? 28, height: size ?? 28 }}
    >
      {playerIcon ? playerIcon.icon : <FaUserGraduate />}
    </div>
  );
};
