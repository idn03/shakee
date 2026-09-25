import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/src/shared/lib/firebase";

export const emailExistsInFirestore = async (email: string) => {
  const normalizedEmail = email.trim().toLowerCase();
  const users = collection(db, "users");
  const [normalizedEmailSnapshot, legacyEmailSnapshot] = await Promise.all([
    getDocs(
      query(users, where("emailLowercase", "==", normalizedEmail), limit(1)),
    ),
    getDocs(query(users, where("email", "==", normalizedEmail), limit(1))),
  ]);

  return !normalizedEmailSnapshot.empty || !legacyEmailSnapshot.empty;
};
