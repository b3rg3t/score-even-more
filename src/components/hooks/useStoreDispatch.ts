import {
  useAppDispatch,
  //  useAppSelector
} from "../../store/redux/hooks";
import {
  scoreAdded,
  // selectActiveGame,
  //   selectActiveGame,
  // selectIsOnline,
} from "../../store/reducers/game/gameSlice";
import { TPlayer } from "../../models/type/players/TPlayer";
import { IGame } from "../../models/interface/IGame";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../../lib/firebase/init-firebase";
// import { ECollection } from "../../models/enum/ECollection";

export const useStoreDispatch = () => {
  // const isOnline = useAppSelector(selectIsOnline);
  // const activeGame = useAppSelector(selectActiveGame);
  const dispatch = useAppDispatch();

  const addScore = async (
    score: number,
    playerId: TPlayer["playerId"],
    roundId: IGame["gameId"]
  ) => {
    // if (isOnline) {
    //   await setDoc(doc(db, ECollection.GAMES, activeGame.gameId), activeGame);
    //   return;
    // }
    dispatch(
      scoreAdded({
        roundId,
        score: { player: playerId, score },
      })
    );
  };
  return { addScore };
};
