import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./ui/App.js";
import { LocaleProvider } from "./ui/i18n/index.js";
import "./ui/fonts.js";
import "./ui/styles.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("root element #root not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </StrictMode>,
);
