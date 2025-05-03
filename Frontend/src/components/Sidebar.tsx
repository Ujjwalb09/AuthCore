import { useState } from "react";
import {
  BadgeCheck,
  Home,
  KeyRound,
  KeyRoundIcon,
  Menu,
  Shield,
  UserCog,
  Users,
  X,
} from "lucide-react";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type SidebarProps = {
  className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { logout, permissions, roles, user } = useAuth();
  console.log(permissions);
  console.log(roles);
  console.log(user);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed bottom-4 left-4 z-50 p-2 rounded-full bg-primary text-primary-foreground shadow-md"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={` 
        fixed md:static inset-y-0 left-0 z-100 
        w-64 md:w-56 shrink-0 
        bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60
        border-r transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        ${className}
      `}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="p-4">
            {user?.isAdmin ? (
              <>
                <ul className="space-y-2">
                  <li className="hover:scale-105 transition-all duration-300">
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
                    >
                      <Home size={17} />
                      <span className="text-[14px]">Dashboard</span>
                    </Link>
                  </li>
                  <li className="hover:scale-105 transition-all duration-300">
                    <Link
                      to={"/manage-user"}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
                    >
                      <Users size={17} />
                      <span className="text-[14px]">Manage Users</span>
                    </Link>
                  </li>
                  <li className="hover:scale-105 transition-all duration-300">
                    <Link
                      to="/manage-role"
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
                    >
                      <UserCog size={17} />
                      <span className="text-[14px]">Manage Roles</span>
                    </Link>
                  </li>
                  <li className="hover:scale-105 transition-all duration-300">
                    <Link
                      to="/manage-permission"
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
                    >
                      <KeyRoundIcon size={17} />
                      <span className="text-[14px]">Manage Permissions</span>
                    </Link>
                  </li>
                  {/* <li className="hover:scale-105 transition-all duration-300">
                    <a
                      href="#"
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
                    >
                      <Settings size={17} />
                      <span className="text-[14px]">Admin Settings</span>
                    </a>
                  </li> */}
                </ul>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <h2 className="text-md font-semibold mb-4 text-primary tracking-tight">
                    Welcome, {user?.name}
                  </h2>
                  <div className="border rounded-md p-3 bg-muted/50">
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-1 text-muted-foreground">
                      <Shield size={16} /> Roles Assigned
                    </h3>
                    <ul className="space-y-1 pl-2">
                      {roles.length > 0 ? (
                        roles.map((role) => (
                          <li
                            key={role._id}
                            className="text-sm flex items-center gap-2 text-muted-foreground cursor-pointer hover:underline"
                          >
                            <Link
                              to={`/access/${role.name}`}
                              className="flex items-center gap-1"
                            >
                              <BadgeCheck size={14} className="text-blue-500" />
                              <span>{role.name}</span>
                            </Link>
                          </li>
                        ))
                      ) : (
                        <li className="text-xs text-muted-foreground">
                          No roles assigned
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="border rounded-md p-3 bg-muted/50">
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-1 text-muted-foreground">
                      <KeyRound size={16} />
                      Your Permissions
                    </h3>
                    <ul className="space-y-1 pl-2">
                      {permissions.length > 0 ? (
                        permissions.map((perm) => (
                          <li
                            key={perm}
                            className="text-sm flex items-center gap-2 text-muted-foreground cursor-pointer hover:underline"
                          >
                            <Link
                              to={`/access/${perm}`}
                              className="flex items-center gap-1"
                            >
                              <KeyRound size={14} className="text-green-600" />
                              <span>{perm}</span>
                            </Link>
                          </li>
                        ))
                      ) : (
                        <li className="text-xs text-muted-foreground">
                          No permissions found
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="mt-10 flex ">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-destructive text-destructive hover:text-destructive-foreground hover:text-white m-2  ml-5 mr-5 cursor-pointer"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
