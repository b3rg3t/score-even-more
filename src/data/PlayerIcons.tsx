import {
    FaUserAstronaut,
  FaUserGraduate,
  FaUserInjured,
  FaUserMd,
  FaUserNinja,
  FaUserNurse,
  FaUserSecret,
  FaUserTie,
} from "react-icons/fa";
import { EPlayerIcon } from "../models/enum/EPlayerIcon";

export const playerIcons = [
  { icon: <FaUserGraduate />, name: EPlayerIcon.GRADUATE },
  { icon: <FaUserInjured />, name: EPlayerIcon.INJURED },
  { icon: <FaUserMd />, name: EPlayerIcon.MEDIC },
  { icon: <FaUserNinja />, name: EPlayerIcon.NINJA },
  { icon: <FaUserSecret />, name: EPlayerIcon.SPY },
  { icon: <FaUserAstronaut />, name: EPlayerIcon.ASTRONAUT },
  { icon: <FaUserTie />, name: EPlayerIcon.SUITE },
  { icon: <FaUserNurse />, name: EPlayerIcon.NURSE },
];
