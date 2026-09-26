import { createContext, useState, useEffect, PropsWithChildren } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth } from "@/src/features/auth/lib/firebaseAuth";
import { db } from "@/src/shared/lib/firebase";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAuthReady: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    email: string,
    username: string,
    password: string,
    avatarUrl: string,
    registrationId: string,
  ) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsAuthenticated(firebaseUser !== null);
      setIsAuthReady(true);
    });
  }, []);

  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password).then(() => undefined);

  const logout = () => signOut(auth);

  const register = async (
    email: string,
    username: string,
    password: string,
    avatarUrl: string,
    registrationId: string,
  ) => {
    if (__DEV__) {
      console.info("[Auth] Firebase registration started", {
        registrationId,
        avatarProvided: avatarUrl.startsWith("https://"),
      });
    }

    try {
      const { user: createdUser } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      if (__DEV__) {
        console.info("[Auth] Firebase Auth account created", {
          registrationId,
          uid: createdUser.uid,
        });
      }

      const remoteAvatarUrl = avatarUrl.startsWith("https://")
        ? avatarUrl
        : null;

      await updateProfile(createdUser, {
        displayName: username,
        ...(remoteAvatarUrl ? { photoURL: remoteAvatarUrl } : {}),
      });

      await setDoc(doc(db, "users", createdUser.uid), {
        uid: createdUser.uid,
        email: createdUser.email,
        username,
        avatarUrl: remoteAvatarUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      if (__DEV__) {
        console.info("[Auth] Firestore user profile created", {
          registrationId,
          uid: createdUser.uid,
        });
      }
    } catch (error) {
      if (__DEV__) {
        console.log("[Auth] Firebase registration failed", {
          registrationId,
          error,
        });
      }

      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAuthReady,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
