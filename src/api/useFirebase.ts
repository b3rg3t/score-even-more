import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase/init-firebase";
import { ECollection } from "../models/enum/ECollection";
import { TPlayer } from "../models/type/players/TPlayer";
import { TErrorResponse } from "../models/type/TErrorResponse";

const { USERS } = ECollection;

export const useFirebase = () => {
  const getUsers = async (): Promise<TPlayer[]> => {
    const usersRef = collection(db, USERS);
    const docSnap = await getDocs(usersRef);
    // @ts-ignore
    const players: TPlayer[] = docSnap.docs.map((doc) => ({
      ...doc,
      playerId: doc.id,
    }));

    return players;
  };

  const getUserById = async (id: string): Promise<TPlayer | TErrorResponse> => {
    const userRef = doc(db, USERS, id);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const user = docSnap.data();
      return user as TPlayer;
    } else {
      return { message: "", status: 500 };
    }
  };
  return { getUserById, getUsers };
};
