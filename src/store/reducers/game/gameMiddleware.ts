import { doc, setDoc } from "firebase/firestore";
import { setLocalStorage } from "../../../util/localStorage";
import { RootState } from "../../redux/store";
import { ECollection } from "../../../models/enum/ECollection";
import { db } from "../../../lib/firebase/init-firebase";

const gameMiddleware = (store: any) => (next: any) => async (action: any) => {
  const result = next(action);

  const state: RootState = store.getState();

  await setDoc(
    doc(db, ECollection.GAMES, state.game.activeGame.gameId),
    state.game.activeGame
  );

  Object.keys(state).forEach((s) => {
    // @ts-ignore
    setLocalStorage<any>(s, state[s]);
  });

  return result;
};

export { gameMiddleware };
