import { useState } from "react";
import { Home, Menu, Settings, Users, X } from "lucide-react";

type SidebarProps = {
  className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Navigation</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
              >
                <Home size={18} />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
              >
                <Users size={18} />
                <span>Users</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
              >
                <Settings size={18} />
                <span>Settings</span>
              </a>
            </li>
          </ul>
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
