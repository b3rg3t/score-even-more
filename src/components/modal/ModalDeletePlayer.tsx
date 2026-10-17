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
import {
  BottomModalActions,
  BottomModalContent,
} from "../bottomModal/BottomModalLayout";

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
    <BottomModalContent>
      <p className="text-white">
        {formatString(text.modal.deletePlayer.content, player.name)}
      </p>
      <BottomModalActions>
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
      </BottomModalActions>
    </BottomModalContent>
  );
};
