import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import axios from "../lib/axios";
import { toast } from "react-toastify";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const Login = () => {
  const { login, setPermissions, token, setRoles } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    if (token) navigate("/dashboard");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await axios.post("/auth/login", { email, password });

      console.log(data);

      login(data.data.token, {
        _id: data.data._id,
        email: data.data.email,
        isAdmin: data.data.isAdmin,
        name: data.data.name,
      });

      const perms = await axios.get("/users/permissions");
      console.log(perms);

      setPermissions(perms.data.permissionsData);
      setRoles(perms.data.rolesData);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-muted p-6 rounded shadow w-80 space-y-4"
      >
        <h2 className="text-2xl font-bold">Login</h2>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <Button type="submit" className="w-full">
          <div className="flex items-center justify-center">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
              </>
            ) : (
              "Login"
            )}
          </div>
        </Button>
        <div className="mt-3 pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            If you want to login as Admin please use below credentials
            <br />
            email: <span className="font-semibold">admin@admin.com</span>
            <br />
            password: <span className="font-semibold">admin</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
