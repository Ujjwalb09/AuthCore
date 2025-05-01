import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-grow relative">
        <main className="flex-grow container mx-auto md:ml-0">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
