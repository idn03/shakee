import { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    email: string,
    username: string,
    password: string,
    avatarUrl: string
  ) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider = ({
  children,
}: AuthContextProviderProps) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    
  }, []);

  const login = async (email: string, password: string) => {
    try {

    } catch (error) {

    }
  };

  const logout = async () => {
    try {

    } catch (error) {

    }
  };

  const register = async (
    email: string,
    username: string,
    password: string,
    avatarUrl: string
  ) => {
    try {

    } catch (error) {

    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      register,
    }}>
      {children}
    </AuthContext.Provider>
  );
};