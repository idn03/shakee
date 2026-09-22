import { createContext, useState, useEffect, PropsWithChildren } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth } from "@/src/features/auth/lib/firebaseAuth";

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
  ) => {
    const { user: createdUser } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await updateProfile(createdUser, {
      displayName: username,
      // Only use a Firebase Storage download URL here, not a local `file://` URI.
      ...(avatarUrl.startsWith("https://") ? { photoURL: avatarUrl } : {}),
    });
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