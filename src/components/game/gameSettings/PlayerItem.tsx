import { FC } from "react";
import { useAppSelector } from "../../../store/redux/hooks";
import { selectById } from "../../../store/reducers/players/playersSlice";
import { EntityId } from "@reduxjs/toolkit";

interface IPlayerItem {
  id: EntityId;
}

export const PlayerItem: FC<IPlayerItem> = ({ id }) => {
  const player = useAppSelector((state) => selectById(state, id as string));
  return <>{player.name}</>;
};
