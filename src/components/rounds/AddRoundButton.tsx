import { text } from "../../localization/eng";
import { addOneRound } from "../../store/reducers/rounds/roundsSlice";
import { useAppDispatch } from "../../store/redux/hooks";

export const AddRoundButton = () => {
  const dispatch = useAppDispatch();
  const handleAddRoundClick = () => {
    dispatch(
      addOneRound({
        roundId: Date.now().toLocaleString(),
        players: [],
        score: undefined,
      })
    );
  };
  return (
    <button onClick={() => handleAddRoundClick()} className="btn btn-danger">
      {text.rounds.addRoundButton}
    </button>
  );
};
