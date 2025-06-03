import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { LoginProvider } from "./context/LoginContext.jsx";
import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <App />
      </LoginProvider>
    </BrowserRouter>
  </StrictMode>
);
