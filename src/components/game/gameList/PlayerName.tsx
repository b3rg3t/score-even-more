import { EntityId } from "@reduxjs/toolkit";
import { FC } from "react";
import { useAppSelector } from "../../../store/redux/hooks";
import { selectById } from "../../../store/reducers/players/playersSlice";

interface IPlayerName {
  id: EntityId;
  comma: boolean;
}

export const PlayerName: FC<IPlayerName> = ({ id, comma }) => {
  const player = useAppSelector((state) => selectById(state, id as string));

  return (
    <li>
      <span className={comma ? "me-1" : ""}>{`${player.name}${
        comma ? ", " : ""
      }`}</span>
    </li>
  );
};
