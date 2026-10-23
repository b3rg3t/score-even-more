import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { setupStore } from "../src/store/redux/store.ts";
import { Provider } from "react-redux";
import { text } from "./localization/eng.ts";
import { registerSW } from "virtual:pwa-register";

const root = document.getElementById("root");

if (!root) {
  throw new Error(text.errors.root);
}

if (import.meta.env.PROD) {
  registerSW({
    immediate: true,
    onRegisteredSW: (_swUrl, registration) => {
      if (!registration) {
        return;
      }

      const checkForUpdates = () => {
        if (document.visibilityState === "visible") {
          void registration.update().catch((error: unknown) => {
            console.error("Service worker update check failed:", error);
          });
        }
      };

      document.addEventListener("visibilitychange", checkForUpdates);
      checkForUpdates();
    },
    onRegisterError: (error) => {
      console.error("Service worker registration failed:", error);
    },
  });
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
);
