import { FaUserGraduate } from "react-icons/fa";
import { FC } from "react";
import { playerIcons } from "../../data/PlayerIcons";
import { TPlayer } from "../../models/type/players/TPlayer";
import "./UserImage.scss";

interface IUserImage {
  icon?: TPlayer["icon"];
  size?: number;
  border?: boolean;
  devilHorns?: boolean;
}

export const UserImage: FC<IUserImage> = ({
  icon,
  size,
  border = false,
  devilHorns = false,
}) => {
  const playerIcon = playerIcons.find((i) => i.name === icon);

  return (
    <div
      className={`user-image${devilHorns ? " user-image--devil-horns" : border ? " user-image--bordered" : ""}`}
      style={{ width: size ?? 28, height: size ?? 28 }}
    >
      {devilHorns && (
        <svg
          className="user-image__horns"
          viewBox="0 0 32 18"
          aria-hidden="true"
        >
          <g className="user-image__horn user-image__horn--left">
            <path
              className="user-image__horn-outline"
              d="M7 16C4.2 13.3 3.8 9.3 5.8 6.1 7 4.1 8.8 2.1 9.5 1 9.5 3.8 9.6 6.6 10.7 8.8c.8 1.6 1.5 3.4 1.8 5.2Z"
            />
            <path
              className="user-image__horn-core"
              d="M7 16C4.2 13.3 3.8 9.3 5.8 6.1 7 4.1 8.8 2.1 9.5 1 9.5 3.8 9.6 6.6 10.7 8.8c.8 1.6 1.5 3.4 1.8 5.2Z"
            />
          </g>
          <g className="user-image__horn user-image__horn--right">
            <path
              className="user-image__horn-outline"
              d="M25 16c2.8-2.7 3.2-6.7 1.2-9.9C25 4.1 23.2 2.1 22.5 1c0 2.8-.1 5.6-1.2 7.8-.8 1.6-1.5 3.4-1.8 5.2Z"
            />
            <path
              className="user-image__horn-core"
              d="M25 16c2.8-2.7 3.2-6.7 1.2-9.9C25 4.1 23.2 2.1 22.5 1c0 2.8-.1 5.6-1.2 7.8-.8 1.6-1.5 3.4-1.8 5.2Z"
            />
          </g>
        </svg>
      )}
      {playerIcon ? playerIcon.icon : <FaUserGraduate />}
    </div>
  );
};
