import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-grow relative">
        <Sidebar />
        {/* Main content */}
        <main className="flex-grow container mx-auto px-4 py-8 md:ml-0">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
