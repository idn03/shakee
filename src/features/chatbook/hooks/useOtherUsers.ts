import { useEffect, useState } from "react";
import { getOtherUsers } from "../lib/users";
import type { UserProfile } from "../types";

export const useOtherUsers = (currentUserUid?: string) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isActive = true;

    if (!currentUserUid) {
      if (__DEV__) {
        console.info("[Users] Skipping fetch because no current user UID is available");
      }
      setUsers([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    getOtherUsers(currentUserUid)
      .then((result) => {
        if (isActive) setUsers(result);
      })
      .catch((cause: unknown) => {
        if (isActive) {
          if (__DEV__) {
            console.log("[Users] Failed to fetch users", cause);
          }
          setError(cause instanceof Error ? cause : new Error("Could not fetch users"));
          setUsers([]);
        }
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [currentUserUid]);

  return { users, isLoading, error };
};
