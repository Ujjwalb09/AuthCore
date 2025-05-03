import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import {
  AlertCircle,
  Check,
  ChevronDown,
  PlusCircle,
  ShieldCheck,
  Trash2,
  X,
  User2,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Permission {
  _id: string;
  name: string;
}

interface Role {
  _id: string;
  name: string;
  createdAt: string;
  permissions: Permission[];
}

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  roles: Role[];
}

const ManageUser = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isAdmin] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [, setUpdating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("/users");
      setAllUsers(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch users.");
    }
  };

  // Fetch roles
  const fetchRoles = async () => {
    try {
      const res = await axios.get("/role");
      setRoles(res.data.data);
    } catch {
      toast.error("Failed to fetch roles.");
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, []);

  // Create new user
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("/auth/register", {
        name: userName,
        email: userEmail,
        password: userPassword,
        isAdmin,
        roles: selectedRoleIds,
      });
      toast.success(`User ${res.data.data.name} created successfully!`);
      setUserName("");
      setUserEmail("");
      setUserPassword("");
      setSelectedRoleIds([]);
      fetchUsers();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create user.");
    } finally {
      setLoading(false);
    }
  };

  const toggleRole = (id: string) => {
    setSelectedRoleIds((prev) =>
      prev.includes(id) ? prev.filter((rid) => rid !== id) : [...prev, id]
    );
  };

  const deleteUser = async (id: string) => {
    try {
      await axios.delete("/users", { data: { id } });
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const addRoleToUser = async (userId: string, roleId: string) => {
    try {
      await axios.put(`/users/${userId}/roles`, {
        roleIds: [roleId],
      });
      toast.success("Role added successfully to user");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to add role");
    } finally {
      setUpdating(false);
    }
  };

  const removeRoleFromUser = async (userId: string, roleId: string) => {
    try {
      setUpdating(true);
      await axios.put(`/users/${userId}/role`, { roleId });
      toast.success("Role removed successfully for user");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to remove role");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Create user card */}
        <div className="max-w-3xl w-[350px] mx-auto bg-card border rounded-md shadow-sm flex flex-col h-[400px]">
          <div className="flex items-center gap-3 p-6 pb-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <User2 size={24} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Create User</h1>
          </div>

          <div className="overflow-y-auto flex-1 p-6 pt-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  placeholder="Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  placeholder="Email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <Input
                    placeholder="Password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    required
                    type={showPassword ? "text" : "password"}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Roles
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between h-auto py-3 text-left font-normal"
                    >
                      {selectedRoleIds.length > 0 ? (
                        <span>
                          {selectedRoleIds.length} role
                          {selectedRoleIds.length !== 1 ? "s" : ""} selected
                        </span>
                      ) : (
                        <span className="text-muted-foreground">
                          Select Roles...
                        </span>
                      )}
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search roles..." />
                      <CommandEmpty>No roles found.</CommandEmpty>
                      <CommandGroup className="max-h-52 overflow-auto">
                        {roles.map((role) => (
                          <CommandItem
                            key={role._id}
                            onSelect={() => toggleRole(role._id)}
                          >
                            <div className="flex items-center gap-2 w-full">
                              <div
                                className={cn(
                                  "border rounded-sm w-4 h-4 flex items-center justify-center",
                                  selectedRoleIds.includes(role._id)
                                    ? "bg-primary border-primary"
                                    : "border-muted-foreground"
                                )}
                              >
                                {selectedRoleIds.includes(role._id) && (
                                  <Check className="h-3 w-3 text-white" />
                                )}
                              </div>
                              {role.name}
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 w-full justify-center cursor-pointer"
              >
                {loading ? (
                  "Creating..."
                ) : (
                  <>
                    <PlusCircle size={18} />
                    Create User
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* User list card */}
        <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-all flex flex-col h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Existing Users</h2>
            <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">
              {allUsers.length} Total
            </span>
          </div>

          <div className="overflow-hidden rounded-md border flex-grow">
            {allUsers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-4 text-center h-full">
                <AlertCircle size={36} className="text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No Users found</p>
                <p className="text-xs text-muted-foreground/80 mt-1">
                  Create your first user using the form
                </p>
              </div>
            ) : (
              <div className="h-full overflow-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/100 sticky top-0 ">
                    <tr className="text-left">
                      <th className="px-4 py-3 font-medium">#</th>
                      <th className="px-4 py-3 font-medium">Name</th>
                      <th className="px-4 py-3 font-medium">Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((user, index) => (
                      <tr
                        key={user._id}
                        className="border-t hover:bg-muted/30 transition-colors group"
                      >
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3 font-medium flex items-center gap-2">
                          <span className="size-2 rounded-full bg-primary/80"></span>
                          <div className="flex items-center gap-2">
                            {user.name === "Admin" || user.name === "admin" ? (
                              <div className="flex items-center gap-3">
                                <span>{user.name}</span>
                                <ShieldCheck
                                  size={16}
                                  className="text-primary opacity-100"
                                />
                              </div>
                            ) : (
                              <Popover>
                                <PopoverTrigger asChild>
                                  <div className="flex items-center gap-3 cursor-pointer">
                                    <span className="hover:text-primary transition-colors">
                                      {user.name}
                                    </span>
                                    <ShieldCheck
                                      size={16}
                                      className="text-primary opacity-100 transition-opacity hover:scale-110"
                                    />
                                  </div>
                                </PopoverTrigger>

                                <PopoverContent
                                  className="w-80 p-4"
                                  align="start"
                                >
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                      <h3 className="text-sm font-medium">
                                        Edit Roles for{" "}
                                        <span className="text-primary">
                                          {user.name}
                                        </span>
                                      </h3>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 min-h-14 bg-muted/40 p-2 rounded-md">
                                      {user.roles.length === 0 ? (
                                        <p className="text-xs text-muted-foreground w-full text-center py-2">
                                          No Roles assigned
                                        </p>
                                      ) : (
                                        user.roles.map((role) => (
                                          <Badge
                                            key={role._id}
                                            variant="secondary"
                                            className="flex items-center gap-1 text-xs group relative pr-6"
                                          >
                                            {role.name}
                                            <button
                                              type="button"
                                              className="absolute right-1 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-muted-foreground/10 flex items-center justify-center hover:bg-destructive/10"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                removeRoleFromUser(
                                                  user._id,
                                                  role._id
                                                );
                                              }}
                                            >
                                              <X
                                                size={10}
                                                className="text-muted-foreground hover:text-destructive cursor-pointer"
                                              />
                                            </button>
                                          </Badge>
                                        ))
                                      )}
                                    </div>

                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button
                                          variant="outline"
                                          className="gap-2 w-full text-sm"
                                          size="sm"
                                        >
                                          <PlusCircle size={14} />
                                          Add Roles
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent
                                        className="w-72 p-0"
                                        align="center"
                                      >
                                        <Command>
                                          <CommandInput placeholder="Search roles..." />
                                          <CommandEmpty>
                                            No roles found
                                          </CommandEmpty>
                                          <CommandGroup className="max-h-60 overflow-auto">
                                            {roles
                                              .filter(
                                                (role) =>
                                                  !user.roles.some(
                                                    (userRole) =>
                                                      userRole._id === role._id
                                                  )
                                              )
                                              .map((role) => (
                                                <CommandItem
                                                  key={role._id}
                                                  onSelect={() =>
                                                    addRoleToUser(
                                                      user._id,
                                                      role._id
                                                    )
                                                  }
                                                >
                                                  {role.name}
                                                </CommandItem>
                                              ))}
                                          </CommandGroup>
                                        </Command>
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            )}

                            {user.name !== "Admin" && (
                              <Trash2
                                onClick={() => deleteUser(user._id)}
                                size={16}
                                className="text-red-400 opacity-100 transition-opacity cursor-pointer hover:scale-110"
                              />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageUser;
