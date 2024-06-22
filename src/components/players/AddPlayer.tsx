import { useForm } from "react-hook-form";
import { PLAYER } from "../../models/type/TPlayer";
import { text } from "../../localization/eng";
import { useState } from "react";
import { useAppDispatch } from "../../store/redux/hooks";
import { addOnePlayer } from "../../store/reducers/players/playersSlice";
import { FaTimes } from "react-icons/fa";
import { Message } from "../shared/Message";

import { RiUserAddLine } from "react-icons/ri";
import { PlayerList } from "./PlayerList";

const { addPlayersButton } = text.players;

export const AddPlayer = () => {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useAppDispatch();
  const {
    reset,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<PLAYER>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: PLAYER) => {
    dispatch(
      addOnePlayer({ playerId: Date.now().toLocaleString(), name: data.name })
    );
    setShowForm(false);
    reset();
  };

  const handleCloseForm = () => {
    reset();
    setShowForm(false);
  };

  if (!showForm) {
    return (
      <div className="d-flex flex-column align-items-start">
        <button className="btn btn-info btn-sm text-white me-1 mb-1" onClick={() => setShowForm(true)}>
          <RiUserAddLine />
        </button>
        <PlayerList />
      </div>
    );
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column bg-dark-subtle border shadow p-2 m-2 rounded justify-content-center"
      >
        <div className="d-flex align-items-start mb-2">
          <div className="d-flex flex-column w-100 align-items-start me-2">
            <input
              className="form-control"
              type="text"
              placeholder="Name.."
              {...register("name", { required: text.formValidation.required })}
            />
            {errors["name"]?.message && (
              <Message text={errors["name"]?.message} />
            )}
          </div>
          <button
            title={text.button.close}
            type="button"
            className="btn btn-sm d-flex align-items-center p-2"
            onClick={handleCloseForm}
          >
            <FaTimes />
          </button>
        </div>
        <div className="w-100 d-flex justify-content-end gap-2 flex-wrap">
          <button className="btn btn-sm btn-dark" type="submit">
            {addPlayersButton}
          </button>
          <button
            className="btn btn-sm btn-secondary"
            type="button"
            onClick={handleCloseForm}
          >
            {text.button.close}
          </button>
        </div>
      </form>
     
    </>
  );
};
