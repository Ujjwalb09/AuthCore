import { ThemeProvider } from "./context/theme-provider";
import { AuthProvider } from "./context/auth-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Layout from "./components/Layout";
import CommonPage from "./Pages/CommonPage";
import ManagePermission from "./Pages/ManagePermission";
import ManageRole from "./Pages/ManageRole";
import ManageUser from "./Pages/ManageUser";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/access/:name" element={<CommonPage />} />
              <Route path="/manage-permission" element={<ManagePermission />} />
              <Route path="/manage-role" element={<ManageRole />} />
              <Route path="/manage-user" element={<ManageUser />} />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
            <Analytics />
          </Layout>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="colored"
          />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
