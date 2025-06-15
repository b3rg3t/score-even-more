import { useAppSelector } from "../../store/redux/hooks";
import { selectIsOnline } from "../../store/reducers/game/gameSlice";

export const OnlineIndicator = () => {
  const isOnline = useAppSelector(selectIsOnline);

  return (
    <div
      className={`p-1 border border-light rounded-circle ${
        isOnline ? " bg-primary" : "bg-danger"
      }`}
    />
  );
};
