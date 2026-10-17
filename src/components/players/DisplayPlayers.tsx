import { selectTotal } from "../../store/reducers/players/playersSlice";
import { useAppSelector } from "../../store/redux/hooks";

export const DisplayPlayers = () => {
  const totalPlayers = useAppSelector(selectTotal);
  return (
    <div className="status-badge status-badge--secondary">{totalPlayers}</div>
  );
};
