import { createAction } from "@reduxjs/toolkit";
import { ICreateGameExtended } from "../../models/interface/ICreateGame";

export const createGameAction = createAction<ICreateGameExtended>("games/add");
