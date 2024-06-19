import { useForm } from "react-hook-form";
import { PLAYER } from "../../models/player";
import { text } from "../../localization/eng";
import { useState } from "react";
import { useAppDispatch } from "../../store/redux/hooks";
import { addOnePlayer } from "../../store/reducers/players";

const { addPlayersButton, addPlayerButton } = text.players;

export const AddPlayer = () => {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useAppDispatch()
  const { reset,register, handleSubmit } = useForm<PLAYER>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: PLAYER) => {
    dispatch(addOnePlayer({ playerId: Date.now().toLocaleString(), name: data.name }))
    setShowForm(false)
    reset();
  };

  if (!showForm) {
    return (
      <div>
        <button onClick={() => setShowForm(true)}>{addPlayerButton}</button>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
      <button type="button" className="btn btn-dark" onClick={() => setShowForm(false)}>
        X
      </button>
      <input type="text" {...register("name", { required: true })}></input>
      <button  className="btn btn-dark" type="submit">{addPlayersButton}</button>
    </form>
  );
};
