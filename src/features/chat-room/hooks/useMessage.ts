import { useCallback, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type Timestamp,
} from "firebase/firestore";
import { db } from "@/src/shared/lib/firebase";

export interface ChatMessage {
  id: string;
  roomId: string;
  userId: string;
  content: string;
  hasRead: boolean;
  createdAt: Date | null;
}

const toDate = (value: unknown): Date | null => {
  if (value instanceof Date) return value;
  if (value && typeof value === "object" && "toDate" in value && typeof (value as Timestamp).toDate === "function") {
    return (value as Timestamp).toDate();
  }
  return null;
};

export const useMessage = (roomId?: string, currentUserUid?: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(!!roomId);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!roomId) {
      setMessages([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    return onSnapshot(
      query(collection(db, "messages"), where("roomId", "==", roomId)),
      (snapshot) => {
        const nextMessages = snapshot.docs.map((messageDoc) => {
          const data = messageDoc.data();
          return {
            id: messageDoc.id,
            roomId,
            userId: typeof data.userId === "string" ? data.userId : "",
            content: typeof data.content === "string" ? data.content : "",
            hasRead: data.hasRead === true,
            createdAt: toDate(data.createdAt),
          } satisfies ChatMessage;
        }).sort((first, second) => (first.createdAt?.getTime() ?? 0) - (second.createdAt?.getTime() ?? 0));
        setMessages(nextMessages);
        setIsLoading(false);

        if (currentUserUid) {
          nextMessages
            .filter((message) => message.userId !== currentUserUid && !message.hasRead)
            .forEach((message) => {
              void updateDoc(docRef(message.id), { hasRead: true }).catch(() => undefined);
            });
        }
      },
      (cause) => {
        setError(cause);
        setIsLoading(false);
      },
    );
  }, [roomId, currentUserUid]);

  const sendMessage = useCallback(async (content: string) => {
    const trimmedContent = content.trim();
    if (!roomId || !currentUserUid) throw new Error("A chat room and signed-in user are required");
    if (!trimmedContent) return;
    await addDoc(collection(db, "messages"), {
      roomId,
      userId: currentUserUid,
      content: trimmedContent,
      hasRead: false,
      createdAt: serverTimestamp(),
    });
  }, [roomId, currentUserUid]);

  return { messages, isLoading, error, sendMessage };
};

const docRef = (messageId: string) => doc(db, "messages", messageId);
