import { FC, useState } from "react";
import { TPlayer } from "../../models/type/players/TPlayer";
import { UserImage } from "../shared/UserImage";
import { FaAddressCard, FaEdit, FaTrashAlt } from "react-icons/fa";
import { PlayerForm } from "./PlayerForm";
import { useAppDispatch } from "../../store/redux/hooks";
import { text } from "../../localization/eng";
import { setDeletePlayer } from "../../store/reducers/game/gameSlice";

interface IPlayerItem extends TPlayer {
  onInspect: () => void;
}

export const PlayerItem: FC<IPlayerItem> = (props) => {
  const { playerId, name, icon, onInspect } = props;
  const dispatch = useAppDispatch();
  const [editPlayer, setEditPlayer] = useState<boolean>(false);

  const handleRemovePlayer = () => {
    dispatch(setDeletePlayer(playerId));
  };

  return (
    <li className="player-list__item">
      <UserImage size={40} icon={icon} border />
      {editPlayer ? (
        <div className="player-list__content">
          <PlayerForm {...props} setEditPlayer={setEditPlayer} />
        </div>
      ) : (
        <div className="player-list__content">
          <span className="player-list__name">{name}</span>
          <div className="player-list__actions">
            <button
              type="button"
              title={text.playerProfile.inspect}
              aria-label={`${text.playerProfile.inspect}: ${name}`}
              className="player-list__action player-list__action--inspect"
              onClick={onInspect}
            >
              <FaAddressCard aria-hidden="true" />
            </button>
            <button
              type="button"
              title={text.button.editPlayer}
              aria-label={`${text.button.editPlayer}: ${name}`}
              className="player-list__action player-list__action--edit"
              onClick={() => setEditPlayer(true)}
            >
              <FaEdit aria-hidden="true" />
            </button>
            <button
              type="button"
              title={text.button.removePlayer}
              aria-label={`${text.button.removePlayer}: ${name}`}
              className="player-list__action player-list__action--remove"
              onClick={() => handleRemovePlayer()}
            >
              <FaTrashAlt aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </li>
  );
};
