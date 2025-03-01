import { formatString } from "../../helpers/stringFormat";
import { text } from "../../localization/eng";
import {
  selectPlayerId,
  setActiveBottomModal,
} from "../../store/reducers/game/gameSlice";
import {
  removeOnePlayer,
  selectById,
} from "../../store/reducers/players/playersSlice";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";

export const ModalDeletePlayer = () => {
  const dispatch = useAppDispatch();
  const playerId = useAppSelector(selectPlayerId);
  const player = useAppSelector((state) => selectById(state, playerId ?? ""));

  const handleRemovePlayer = () => {
    dispatch(removeOnePlayer(player.playerId));
  };

  const handleCancel = () => {
    dispatch(setActiveBottomModal("showPlayers"));
  };

  if (!player) {
    return null;
  }
  return (
    <div className="text-white">
      <p>{formatString(text.modal.deletePlayer.content, player.name)}</p>
      <div className="d-flex gap-2 justify-content-center">
        <button
          className="btn btn-danger"
          type="button"
          onClick={handleRemovePlayer}
        >
          {`${text.button.removePlayer} ${player.name}`}
        </button>
        <button
          className="btn btn-outline-primary text-white"
          type="button"
          onClick={handleCancel}
        >
          {formatString(text.button.cancel, player.name)}
        </button>
      </div>
    </div>
  );
};
