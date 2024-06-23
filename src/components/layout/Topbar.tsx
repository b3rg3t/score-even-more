import { FaFlagCheckered, FaTimes } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import {
  selectDisplayUsers,
  setDisplayUsers,
} from "../../store/reducers/game/gameSlice";
import { BurgerMenu } from "../burgerMenu/BurgerMenu";

export const Topbar = () => {
  const dispatch = useAppDispatch();
  const displayUsers = useAppSelector(selectDisplayUsers);

  return (
    <header className="topbar border-bottom d-flex sticky-top justify-content-between text-white px-1 pt-1 pb-2">
      <h1 className="d-flex align-items-center">
        <FaFlagCheckered className="me-2" />
        Score more
      </h1>
      {!displayUsers ? (
        <button
          className="btn btn-outline-info btn-sm text-white"
          onClick={() => dispatch(setDisplayUsers(true))}
        >
          <FaUsersGear />
        </button>
      ) : (
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => dispatch(setDisplayUsers(false))}
        >
          <FaUsersGear className="me-1" />
          <FaTimes />
        </button>
      )}
      <BurgerMenu width={300} />
    </header>
  );
};
