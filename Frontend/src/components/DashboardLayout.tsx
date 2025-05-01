import { PropsWithChildren } from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-grow container mx-auto px-4 py-6 md:ml-0">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
