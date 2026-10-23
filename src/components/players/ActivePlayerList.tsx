import { type DragEvent, type FC, useRef } from "react";
import { FaGripVertical, FaTimes } from "react-icons/fa";
import { type IActivePlayerList } from "../../models/interface/IActivePlayerList";
import { text } from "../../localization/eng";
import { type TPlayer } from "../../models/type/players/TPlayer";
import { UserImage } from "../shared/UserImage";

export const ActivePlayerList: FC<IActivePlayerList> = ({
  onRemovePlayer,
  onReorderPlayers,
  playerList,
}) => {
  const draggedPlayerId = useRef<TPlayer["playerId"] | null>(null);

  if (!playerList?.length) {
    return <></>;
  }

  const handleDrop = (
    event: DragEvent<HTMLLIElement>,
    targetPlayerId: TPlayer["playerId"],
  ) => {
    event.preventDefault();
    const sourcePlayerId =
      draggedPlayerId.current ?? event.dataTransfer.getData("text/plain");
    draggedPlayerId.current = null;

    if (
      !onReorderPlayers ||
      !sourcePlayerId ||
      sourcePlayerId === targetPlayerId
    ) {
      return;
    }

    const sourceIndex = playerList.findIndex(
      (player) => player.playerId === sourcePlayerId,
    );
    const targetIndex = playerList.findIndex(
      (player) => player.playerId === targetPlayerId,
    );

    if (sourceIndex < 0 || targetIndex < 0) {
      return;
    }

    const reorderedPlayers = [...playerList];
    const [draggedPlayer] = reorderedPlayers.splice(sourceIndex, 1);
    reorderedPlayers.splice(targetIndex, 0, draggedPlayer);
    onReorderPlayers(reorderedPlayers);
  };

  return (
    <ul className="list-unstyled d-flex flex-column align-items-start gap-1 mb-0">
      {playerList.map((player) => (
        <li
          key={player.playerId}
          className="d-flex align-items-center gap-1 w-100 ps-2 pe-1 py-1 rounded-pill text-white border border-1 shadow-sm"
          draggable={Boolean(onReorderPlayers)}
          onDragStart={(event) => {
            draggedPlayerId.current = player.playerId;
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("text/plain", player.playerId);
          }}
          onDragOver={(event) => {
            if (onReorderPlayers) {
              event.preventDefault();
              event.dataTransfer.dropEffect = "move";
            }
          }}
          onDrop={(event) => handleDrop(event, player.playerId)}
          onDragEnd={() => {
            draggedPlayerId.current = null;
          }}
          style={{
            background:
              "linear-gradient(135deg, rgba(77, 0, 85, 0.78), rgba(151, 2, 167, 0.65))",
            borderColor: "rgba(77, 0, 85, 0.28)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.25), 0 2px 6px rgba(30,16,43,0.09)",
            cursor: onReorderPlayers ? "grab" : undefined,
          }}
        >
          {onReorderPlayers && (
            <FaGripVertical
              aria-label={text.button.reorderPlayers}
              title={text.button.reorderPlayers}
              size={12}
            />
          )}
          <UserImage size={20} icon={player.icon} />
          <span className="fw-semibold">{player.name}</span>
          <button
            title={text.button.removePlayer}
            type="button"
            className="btn btn-sm d-flex align-items-center justify-content-center ms-auto p-1 rounded-circle text-white"
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
