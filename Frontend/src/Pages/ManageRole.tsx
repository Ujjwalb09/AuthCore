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

const ManageRole = () => {
  const [roleName, setRoleName] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<string[]>(
    []
  );
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Fetch permissions
  const fetchPermissions = async () => {
    try {
      const res = await axios.get("/permission");
      setPermissions(res.data.data);
    } catch {
      toast.error("Failed to fetch permissions.");
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
    fetchPermissions();
    fetchRoles();
  }, []);

  // Create new role
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleName.trim() || selectedPermissionIds.length === 0) {
      toast.error("Provide a role name and select permissions.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/role", {
        name: roleName,
        permissions: selectedPermissionIds,
      });
      toast.success(`Role ${res.data.data.name} created successfully!`);
      setRoleName("");
      setSelectedPermissionIds([]);
      fetchRoles();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create role.");
    } finally {
      setLoading(false);
    }
  };

  const togglePermission = (id: string) => {
    setSelectedPermissionIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // Delete role
  const handleDeleteRole = async (id: string) => {
    try {
      const res = await axios.delete("/role", { data: { roleId: id } });
      toast.success(res.data.message);
      fetchRoles();
      if (selectedRole?._id === id) setSelectedRole(null);
    } catch {
      toast.error("Something went wrong");
    }
  };

  // Add permission to role
  const addPermission = async (roleId: string, permissionId: string) => {
    console.log("I am here");

    // if (!selectedRole) return;
    try {
      setUpdating(true);
      await axios.put(`/role/${roleId}/add-permissions`, {
        permissionIds: [permissionId],
      });
      toast.success("Permission added");
      fetchRoles();
      setSelectedRole(null);
    } catch {
      toast.error("Failed to add permission");
    } finally {
      setUpdating(false);
    }
  };

  // Remove permission from role
  const removePermission = async (roleId: string, permissionId: string) => {
    // if (!selectedRole) return;
    console.log("role id", roleId);
    console.log("permission id", permissionId);

    try {
      setUpdating(true);
      const res = await axios.put(`/role/${roleId}/remove-permissions`, {
        permissionIds: [permissionId],
      });
      console.log("remove Permission", res);

      toast.success("Permission removed");
      fetchRoles();
      setSelectedRole(null);
    } catch {
      toast.error("Failed to remove permission");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Create role card */}
        <div className="max-w-3xl w-[350px] mx-auto bg-card border rounded-md p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 p-2 rounded-full">
              <ShieldCheck size={24} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Create Role</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Role Name
              </label>
              <Input
                placeholder="e.g. Admin, Editor"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Select Permissions
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between h-auto py-3 text-left font-normal"
                  >
                    {selectedPermissionIds.length > 0 ? (
                      <span>
                        {selectedPermissionIds.length} permission
                        {selectedPermissionIds.length !== 1 ? "s" : ""} selected
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        Select permissions...
                      </span>
                    )}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search permissions..." />
                    <CommandEmpty>No permissions found.</CommandEmpty>
                    <CommandGroup className="max-h-52 overflow-auto">
                      {permissions.map((perm) => (
                        <CommandItem
                          key={perm._id}
                          onSelect={() => togglePermission(perm._id)}
                        >
                          <div className="flex items-center gap-2 w-full">
                            <div
                              className={cn(
                                "border rounded-sm w-4 h-4 flex items-center justify-center",
                                selectedPermissionIds.includes(perm._id)
                                  ? "bg-primary border-primary"
                                  : "border-muted-foreground"
                              )}
                            >
                              {selectedPermissionIds.includes(perm._id) && (
                                <Check className="h-3 w-3 text-white" />
                              )}
                            </div>
                            {perm.name}
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
                  Create Role
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Role list card */}
        <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-all flex flex-col h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Existing Roles</h2>
            <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">
              {roles.length} Total
            </span>
          </div>

          <div className="overflow-hidden rounded-md border flex-grow">
            {roles.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-4 text-center h-full">
                <AlertCircle size={36} className="text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No Roles found</p>
                <p className="text-xs text-muted-foreground/80 mt-1">
                  Create your first Role using the form
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
                    {roles.map((role, index) => (
                      <tr
                        key={role._id}
                        className="border-t hover:bg-muted/30 transition-colors group"
                      >
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3 font-medium flex items-center gap-2">
                          <span className="size-2 rounded-full bg-primary/80"></span>
                          <div className="flex items-center gap-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <div className="flex items-center gap-3 cursor-pointer">
                                  <span className="hover:text-primary transition-colors">
                                    {role.name}
                                  </span>
                                  <ShieldCheck
                                    size={16}
                                    className="text-primary opacity-100  transition-opacity hover:scale-110"
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
                                      Edit Permissions for{" "}
                                      <span className="text-primary">
                                        {role.name}
                                      </span>
                                    </h3>
                                  </div>

                                  <div className="flex flex-wrap gap-1.5 min-h-14 bg-muted/40 p-2 rounded-md">
                                    {role.permissions.length === 0 ? (
                                      <p className="text-xs text-muted-foreground w-full text-center py-2">
                                        No permissions assigned
                                      </p>
                                    ) : (
                                      role.permissions.map((perm) => (
                                        <Badge
                                          key={perm._id}
                                          variant="secondary"
                                          className="flex items-center gap-1 text-xs group relative pr-6"
                                        >
                                          {perm.name}
                                          <button
                                            type="button"
                                            className="absolute right-1 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-muted-foreground/10 flex items-center justify-center hover:bg-destructive/10"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              e.preventDefault();
                                              removePermission(
                                                role._id,
                                                perm._id
                                              );
                                            }}
                                          >
                                            <X
                                              size={10}
                                              className="text-muted-foreground hover:text-destructive"
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
                                        Add Permission
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-72 p-0"
                                      align="center"
                                    >
                                      <Command>
                                        <CommandInput placeholder="Search permissions..." />
                                        <CommandEmpty>
                                          No permission found
                                        </CommandEmpty>
                                        <CommandGroup className="max-h-60 overflow-auto">
                                          {permissions
                                            .filter(
                                              (perm) =>
                                                !role.permissions.find(
                                                  (p) => p._id === perm._id
                                                )
                                            )
                                            .map((perm) => (
                                              <CommandItem
                                                key={perm._id}
                                                onSelect={() =>
                                                  addPermission(
                                                    role._id,
                                                    perm._id
                                                  )
                                                }
                                              >
                                                {perm.name}
                                              </CommandItem>
                                            ))}
                                        </CommandGroup>
                                      </Command>
                                    </PopoverContent>
                                  </Popover>
                                </div>
                              </PopoverContent>
                            </Popover>

                            <Trash2
                              onClick={() => handleDeleteRole(role._id)}
                              size={16}
                              className="text-red-400 opacity-100 transition-opacity cursor-pointer hover:scale-110"
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {new Date(role.createdAt).toLocaleDateString(
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

export default ManageRole;
