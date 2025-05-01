import { createContext, useContext, useEffect, useState } from "react";

interface User {
  _id: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  token: string | null;
  permissions: string[];
  user: User | null;
  login: (token: string, userInfo: User) => void;
  logout: () => void;
  setPermissions: (perms: string[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [user, setUser] = useState<User | null>(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null
  );

  const [permissions, setPermissionState] = useState<string[]>([]);

  const login = (newToken: string, userInfo: User) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userInfo));
    setToken(newToken);
    setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setPermissionState([]);
  };

  const setPermissions = (perms: string[]) => {
    setPermissionState(perms);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, permissions, login, logout, setPermissions }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
