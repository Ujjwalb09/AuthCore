import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  token: string | null;
  permissions: string[];
  login: (token: string) => void;
  logout: () => void;
  setPermissions: (perms: string[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [permissions, setPermissionState] = useState<string[]>([]);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setPermissionState([]);
  };

  const setPermissions = (perms: string[]) => {
    setPermissionState(perms);
  };

  return (
    <AuthContext.Provider
      value={{ token, permissions, login, logout, setPermissions }}
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
