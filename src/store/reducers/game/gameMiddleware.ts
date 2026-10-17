import { Middleware } from "@reduxjs/toolkit";
import { setLocalStorage } from "../../../util/localStorage";
import { RootState } from "../../redux/store";

const gameMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  const state = store.getState() as RootState;

  Object.entries(state).forEach(([storageKey, storageValue]) => {
    setLocalStorage(storageKey, storageValue);
  });

  return result;
};

export { gameMiddleware };
