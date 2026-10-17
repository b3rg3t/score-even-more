import { FC } from "react";
import { FaTimes } from "react-icons/fa";
import { IActivePlayerList } from "../../models/interface/IActivePlayerList";
import { text } from "../../localization/eng";

export const ActivePlayerList: FC<IActivePlayerList> = ({
  onRemovePlayer,
  playerList,
}) => {
  if (!playerList?.length) {
    return <></>;
  }
  return (
    <ul className="list-unstyled d-flex flex-wrap gap-1 mb-0">
      {playerList.map((player) => (
        <li
          key={player.playerId}
          className="d-flex align-items-center gap-2 ps-2 pe-1 py-1 rounded-pill text-white border border-1 shadow-sm"
          style={{
            background:
              "linear-gradient(135deg, rgba(77, 0, 85, 0.78), rgba(151, 2, 167, 0.65))",
            borderColor: "rgba(77, 0, 85, 0.28)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.25), 0 2px 6px rgba(30,16,43,0.09)",
          }}
        >
          <span className="fw-semibold">{player.name}</span>
          <button
            title={text.button.removePlayer}
            type="button"
            className="btn btn-sm d-flex align-items-center justify-content-center p-1 rounded-circle text-white"
            style={{
              width: "1.3rem",
              height: "1.3rem",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
            onClick={() => onRemovePlayer(player.playerId)}
            aria-label={text.button.removePlayer}
          >
            <FaTimes size={9} />
          </button>
        </li>
      ))}
    </ul>
  );
};
