import { useTheme } from "@/context/theme-provider";
import { Moon, Sun } from "lucide-react";

const Header = () => {
  const { theme, setTheme } = useTheme();

  const darkMode = theme === "dark";
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* title */}
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-blue-500 ">auth</h1>
          <h1 className="text-3xl font-bold">Core.</h1>
        </div>
        {/* toggle theme button */}
        <div
          className={`flex items-center cursor-pointer transition-transform duration-500 ${
            darkMode ? "rotate-180" : "rotate-0"
          }`}
          onClick={() => setTheme(darkMode ? "light" : "dark")}
        >
          {darkMode ? (
            <Sun className="h-6 w-6 text-yellow-500" />
          ) : (
            <Moon className="h-6 w-6 text-blue-500" />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
