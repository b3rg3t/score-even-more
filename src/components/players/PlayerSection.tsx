import { selectDisplayUsers } from "../../store/reducers/rounds/roundsSlice";
import { useAppSelector } from "../../store/redux/hooks";
import { AddPlayer } from "./AddPlayer";

export const PlayerSection = () => {
  const displayUsers = useAppSelector(selectDisplayUsers);
  if (!displayUsers) {
    return <></>;
  }
  return <AddPlayer />;
};
