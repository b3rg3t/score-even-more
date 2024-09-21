import { selectDisplayUsers } from "../../store/reducers/game/gameSlice";
import { useAppSelector } from "../../store/redux/hooks";
import { PlayerList } from "../playerList/PlayerList";

export const PlayerSection = () => {
  const displayUsers = useAppSelector(selectDisplayUsers);
  if (!displayUsers) {
    return <></>;
  }
  return <PlayerList />;
};
