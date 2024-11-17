import { FC } from "react";
import { FaTimes } from "react-icons/fa";
import { IActivePlayerList } from "../../models/interface/IActivePlayerList";
import { text } from "../../localization/eng";

export const ActivePlayerList: FC<IActivePlayerList> = ({
  onRemovePlayer,
  playerList,
}) => {
  if(!playerList?.length){
    return <></>
  }
  return (
    <ul className="list-unstyled d-flex flex-wrap gap-1 mb-0">
      {playerList.map((player) => (
        <li
          key={player.playerId}
          className="d-flex ps-2 pe-1 py-1 rounded bg-secondary text-white gap-1 border"
        >
          {player.name}
          <button
            type="button"
            className="btn btn-sm text-white"
            onClick={() => onRemovePlayer(player.playerId)}
            aria-label={text.button.removePlayer}
          >
            <FaTimes />
          </button>
        </li>
      ))}
    </ul>
  );
};
