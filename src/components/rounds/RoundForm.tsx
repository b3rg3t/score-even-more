import { FaMinus, FaPlus } from "react-icons/fa";
import { PLAYER } from "../../models/player";
import { ROUND } from "../../models/round";
import { UserImage } from "../shared/UserImage";
import { useAppDispatch } from "../../store/redux/hooks";
// import { scoreAdded } from "../../store/reducers/rounds/roundsSlice";

interface IRoundForm {
  roundId: ROUND["roundId"];
  player: PLAYER;
}

export const RoundForm = ({ roundId, player }: IRoundForm) => {
  const dispatch = useAppDispatch();
  const handleSetScore = (value: number) => {
    // dispatch(
    //   scoreAdded({
    //     id: roundId,
    //     changes: { score: { [player.playerId]: value } },
    //   })
    // );
    console.log(value);
  };
  return (
    <li className="d-flex bg-dark text-white align-items-center justify-content-between border p-1 rounded">
      <div className="d-flex align-content-center">
        <UserImage />
        {player.name}
      </div>
      <div className="d-flex gap-1">
        <button
          className="btn btn-outline-info text-white"
          onClick={() => handleSetScore(-1)}
        >
          <FaMinus />
        </button>
        <div style={{ width: 30 }}></div>
        <button
          className="btn btn-outline-info text-white"
          onClick={() => handleSetScore(1)}
        >
          <FaPlus />
        </button>
      </div>
    </li>
  );
};
