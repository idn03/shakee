import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, type Timestamp } from "firebase/firestore";
import { getOtherUsers } from "../lib/users";
import { getChatRoomId } from "@/src/features/chat-room/hooks/useChatRoom";
import { db } from "@/src/shared/lib/firebase";
import type { UserProfile } from "../types";

export const useOtherUsers = (currentUserUid?: string) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isActive = true;
    const unsubscribeMessages: Array<() => void> = [];

    if (!currentUserUid) {
      setUsers([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    getOtherUsers(currentUserUid)
      .then((profiles) => {
        if (!isActive) return;
        setUsers(profiles.map((profile) => ({ ...profile, seen: true })));
        setIsLoading(false);

        profiles.forEach((profile) => {
          const roomId = getChatRoomId(currentUserUid, profile.uid);
          const messagesQuery = query(collection(db, "messages"), where("roomId", "==", roomId));
          unsubscribeMessages.push(onSnapshot(messagesQuery, (snapshot) => {
            if (!isActive || snapshot.empty) return;
            const latest = [...snapshot.docs].sort((first, second) => {
              const firstTime = timestampToMillis(first.data().createdAt);
              const secondTime = timestampToMillis(second.data().createdAt);
              return secondTime - firstTime;
            })[0];
            if (!latest) return;
            const message = latest.data();
            setUsers((current) => current.map((user) => user.uid !== profile.uid ? user : {
              ...user,
              lastMessageContent: typeof message.content === "string" ? message.content : "",
              lastMessageOwner: typeof message.userId === "string" ? message.userId : "",
              lastMessageDate: timestampToDate(message.createdAt),
              seen: message.userId === currentUserUid || message.hasRead === true,
            }));
          }, (cause) => {
            if (isActive) setError(cause);
          }));
        });
      })
      .catch((cause: unknown) => {
        if (isActive) {
          setError(cause instanceof Error ? cause : new Error("Could not fetch users"));
          setUsers([]);
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
      unsubscribeMessages.forEach((unsubscribe) => unsubscribe());
    };
  }, [currentUserUid]);

  return { users, isLoading, error };
};

const timestampToMillis = (value: unknown) => {
  if (value instanceof Date) return value.getTime();
  if (value && typeof value === "object" && "toMillis" in value && typeof (value as Timestamp).toMillis === "function") {
    return (value as Timestamp).toMillis();
  }
  return 0;
};

const timestampToDate = (value: unknown) => {
  if (value instanceof Date) return value;
  if (value && typeof value === "object" && "toDate" in value && typeof (value as Timestamp).toDate === "function") {
    return (value as Timestamp).toDate();
  }
  return undefined;
};
