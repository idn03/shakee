import { useCallback, useEffect, useMemo, useState } from "react";
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/src/shared/lib/firebase";

export const getChatRoomId = (firstUid: string, secondUid: string) =>
  [firstUid, secondUid].sort().map(encodeURIComponent).join("__");

export const useChatRoom = (userId?: string, partnerId?: string) => {
  const roomId = useMemo(
    () => userId && partnerId ? getChatRoomId(userId, partnerId) : null,
    [userId, partnerId],
  );
  const [isLoading, setIsLoading] = useState(!!roomId);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!roomId || !userId || !partnerId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    return onSnapshot(
      doc(db, "rooms", roomId),
      (roomSnapshot) => {
        if (roomSnapshot.exists()) {
          setIsLoading(false);
          return;
        }
        void setDoc(doc(db, "rooms", roomId), {
          roomId,
          userId,
          partnerId,
          createdAt: serverTimestamp(),
        }, { merge: true }).then(() => setIsLoading(false)).catch((cause: unknown) => {
          setError(cause instanceof Error ? cause : new Error("Could not create chat room"));
          setIsLoading(false);
        });
      },
      (cause) => {
        setError(cause);
        setIsLoading(false);
      },
    );
  }, [roomId, userId, partnerId]);

  const createOrOpenChatRoom = useCallback(async () => {
    if (!roomId || !userId || !partnerId) throw new Error("Both chat participants are required");
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      userId,
      partnerId,
      createdAt: serverTimestamp(),
    }, { merge: true });
    return roomId;
  }, [roomId, userId, partnerId]);

  return { roomId, isLoading, error, createOrOpenChatRoom };
};
