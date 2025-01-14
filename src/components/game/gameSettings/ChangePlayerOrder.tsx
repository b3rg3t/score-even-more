import { MdDragIndicator } from "react-icons/md";
import { selectActiveGame } from "../../../store/reducers/game/gameSlice";
import { useAppSelector } from "../../../store/redux/hooks";
import { InputWrapper } from "../../form/InputWrapper";
import { UserImage } from "../../shared/UserImage";
import { PlayerItem } from "./PlayerItem";

export const ChangePlayerOrder = () => {
  const activeGame = useAppSelector(selectActiveGame);

  return (
    <InputWrapper label={"Player order"} name={""}>
      <ul className="list-unstyled d-flex flex-column gap-2 mt-1">
        {activeGame.playerIds.map((player) => (
          <li
            key={player}
            className="d-flex text-white align-items-center justify-content-between border rounded px-2 bg-dark py-2"
          >
            <div className="d-flex align-items-center">
              <UserImage size={20} />
              <PlayerItem id={player} />
            </div>
            <MdDragIndicator />
          </li>
        ))}
      </ul>
    </InputWrapper>
  );
};
