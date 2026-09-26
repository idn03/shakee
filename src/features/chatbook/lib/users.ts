import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/src/shared/lib/firebase";
import type { UserProfile } from "../types";

export const getOtherUsers = async (currentUserUid: string) => {
  if (__DEV__) {
    console.info("[Users] Fetching users excluding current user", {
      currentUserUid,
    });
  }
  const usersRef = collection(db, "users");
  const usersQuery = query(usersRef, where("uid", "!=", currentUserUid));
  const snapshot = await getDocs(usersQuery);

  if (__DEV__) {
    console.info("[Users] Firestore query completed", {
      count: snapshot.size,
      userIds: snapshot.docs.map((userDoc) => userDoc.id),
    });
  }

  return snapshot.docs.map((userDoc) => {
    const data = userDoc.data();
    return {
      uid: typeof data.uid === "string" ? data.uid : userDoc.id,
      username: typeof data.username === "string" ? data.username : "Unknown user",
      avatarUrl: typeof data.avatarUrl === "string" ? data.avatarUrl : null,
      email: typeof data.email === "string" ? data.email : null,
    } satisfies UserProfile;
  });
};
