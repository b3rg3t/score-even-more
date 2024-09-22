import { FaPlus } from "react-icons/fa";
import { text } from "../../localization/eng";
import { addOneRound } from "../../store/reducers/game/gameSlice";
import { useAppDispatch } from "../../store/redux/hooks";

export const NewRoundButton = () => {
  const dispatch = useAppDispatch();
  const handleAddRoundClick = () => {
    dispatch(addOneRound());
  };
  return (
    <section className="mb-2 d-flex justify-content-end">
      <button
        onClick={() => handleAddRoundClick()}
        className="btn btn-info btn-sm text-white"
      >
        <FaPlus className="me-1" /> {text.footer.addRoundButton}
      </button>
    </section>
  );
};
