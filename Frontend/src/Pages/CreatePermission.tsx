import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound, PlusCircle, AlertCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../lib/axios";

interface Permission {
  _id: string;
  name: string;
  createdAt: string;
}

const CreatePermission = () => {
  const [permissionName, setPermissionName] = useState("");
  const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPermissions = async () => {
    try {
      const res = await axios.get("/permission");
      setAllPermissions(res.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!permissionName.trim()) {
      toast.error("Permission name is required.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/permission", { name: permissionName });

      toast.success(`Permission ${res.data.data.name} created successfully!`);
      setPermissionName("");
      fetchPermissions();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to create permission."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePermissions = async (id: string) => {
    try {
      const res = await axios.delete("/permission", {
        data: { permissionId: id },
      });
      toast.success(res.data.message);
      fetchPermissions();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Create Permission Card */}
        <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-all h-fit">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 p-2 rounded-full">
              <KeyRound size={24} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Create Permission</h1>
          </div>

          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="permissionName"
                placeholder="Enter permission name"
                value={permissionName}
                onChange={(e) => setPermissionName(e.target.value)}
                className="w-full"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                "Creating..."
              ) : (
                <>
                  <PlusCircle size={18} />
                  Create Permission
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Permissions List Card */}
        <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-all flex flex-col h-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Existing Permissions</h2>
            <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">
              {allPermissions.length} Total
            </span>
          </div>

          <div className="overflow-hidden rounded-md border flex-grow">
            {allPermissions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-4 text-center h-full">
                <AlertCircle size={36} className="text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No permissions found</p>
                <p className="text-xs text-muted-foreground/80 mt-1">
                  Create your first permission using the form
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
                    {allPermissions.map((perm, index) => (
                      <tr
                        key={perm._id}
                        className="border-t hover:bg-muted/30 transition-colors group"
                      >
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3 font-medium flex items-center gap-2">
                          <span className="size-2 rounded-full bg-primary/80"></span>
                          <div className="flex items-center gap-2">
                            {perm.name}
                            <Trash2
                              onClick={() => handleDeletePermissions(perm._id)}
                              size={16}
                              className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:scale-110"
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {new Date(perm.createdAt).toLocaleDateString(
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

export default CreatePermission;
