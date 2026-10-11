import { createRoot } from "react-dom/client";
  // @ts-ignore
  import App from "./App.tsx";
  import "./tailwind.css";
  import "./index.css";
  import "./tailwind-utilities.css";
  import { ThemeProvider } from "./components/ThemeProvider";

  createRoot(document.getElementById("root")!).render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
