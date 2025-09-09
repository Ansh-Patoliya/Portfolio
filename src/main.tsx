import { createRoot } from "react-dom/client";
  // @ts-ignore
  import App from "./App.tsx";
  import "./index.css";
  import { ThemeProvider } from "./components/ThemeProvider";

  createRoot(document.getElementById("root")!).render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
