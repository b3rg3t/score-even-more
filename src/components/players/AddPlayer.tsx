import { useForm } from "react-hook-form";
import { TPlayer } from "../../models/type/players/TPlayer";
import { text } from "../../localization/eng";
import { FC, useState } from "react";
import { useAppDispatch } from "../../store/redux/hooks";
import { addOnePlayer } from "../../store/reducers/players/playersSlice";
import { FaTimes } from "react-icons/fa";
import { Message } from "../shared/Message";

import { RiUserAddLine } from "react-icons/ri";
import { PlayerListChip } from "./PlayerListChip";
import { nanoid } from "@reduxjs/toolkit";
import { getRandomNumber } from "../../helpers/GetRandomNumber";
import { playerIcons } from "../../data/PlayerIcons";

const { addPlayersButton } = text.players;

interface IAddPlayer {}

export const AddPlayer: FC<IAddPlayer> = () => {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useAppDispatch();
  const {
    reset,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<TPlayer>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: TPlayer) => {
    dispatch(
      addOnePlayer({
        playerId: nanoid(),
        name: data.name,
        icon: playerIcons[getRandomNumber(playerIcons.length)].name,
      })
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
        <button
          title={text.button.addPlayer}
          className="btn btn-info btn-sm text-white me-1 mb-1"
          onClick={() => setShowForm(true)}
        >
          <RiUserAddLine />
        </button>
        <PlayerListChip />
      </div>
    );
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column bg-dark-subtle border shadow p-1 mb-2 rounded justify-content-center"
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
            title={text.button.close}
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
