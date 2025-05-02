import { createContext, useContext, useEffect, useState } from "react";

interface User {
  name: string;
  _id: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  token: string | null;
  permissions: string[];
  roles: { _id: string; name: string; permissions: string[] }[];
  user: User | null;
  login: (token: string, userInfo: User) => void;
  logout: () => void;
  setPermissions: (perms: string[]) => void;
  setRoles: (
    roles: { _id: string; name: string; permissions: string[] }[]
  ) => void;
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

  const [permissions, setPermissionState] = useState<string[]>(
    localStorage.getItem("permissions")
      ? JSON.parse(localStorage.getItem("permissions")!)
      : []
  );
  const [roles, setRolesState] = useState<
    { _id: string; name: string; permissions: string[] }[]
  >(
    localStorage.getItem("roles")
      ? JSON.parse(localStorage.getItem("roles")!)
      : []
  );
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
    setRolesState([]);
  };

  const setPermissions = (perms: string[]) => {
    setPermissionState(perms);
    localStorage.setItem("permissions", JSON.stringify(perms));
  };

  const setRoles = (
    roles: { _id: string; name: string; permissions: string[] }[]
  ) => {
    setRolesState(roles);
    localStorage.setItem("roles", JSON.stringify(roles));
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        permissions,
        roles,
        login,
        logout,
        setPermissions,
        setRoles,
      }}
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
