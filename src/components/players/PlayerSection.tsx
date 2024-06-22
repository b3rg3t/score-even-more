import { selectDisplayUsers } from "../../store/reducers/game/gameSlice";
import { useAppSelector } from "../../store/redux/hooks";
import { AddPlayer } from "./AddPlayer";

export const PlayerSection = () => {
  const displayUsers = useAppSelector(selectDisplayUsers);
  if (!displayUsers) {
    return <></>;
  }
  return <AddPlayer />;
};
