import { createAction } from "@reduxjs/toolkit";
import { ICreateGame } from "../../models/interface/ICreateGame";

export const createGameAction = createAction<ICreateGame>("games/add");
