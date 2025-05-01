import { ThemeProvider } from "./context/theme-provider";
import Layout from "./components/Layout";
import { AuthProvider } from "./context/auth-context";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <AuthProvider>
        <Layout>"hello World"</Layout>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
