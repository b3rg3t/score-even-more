import { createSlice } from "@reduxjs/toolkit";
import { EStoreKeys } from "../../../models/enum/EStoreKeys";
import { gamesInitialState } from "./gamesInitialState";

export const gamesSlice = createSlice({
    name: EStoreKeys.GAMES,
    initialState: gamesInitialState,
    reducers: {}
})