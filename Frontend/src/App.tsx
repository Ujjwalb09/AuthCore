import "./App.css";
import { ThemeProvider } from "./context/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <div>
        <h1 className="text-3xl font-bold text-red-500">Hello World</h1>
      </div>
    </ThemeProvider>
  );
}

export default App;
