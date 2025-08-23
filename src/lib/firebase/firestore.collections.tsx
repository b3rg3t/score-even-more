import { collection } from "firebase/firestore";
import { db } from "./init-firebase";
import { ECollection } from "../../models/enum/ECollection";

const { USERS, GAMES } = ECollection;

const userCollectionRef = collection(db, USERS);
const gameCollectionRef = collection(db, GAMES);

export { userCollectionRef, gameCollectionRef };
