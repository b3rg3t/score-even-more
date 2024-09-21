import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { setupStore } from "../src/store/redux/store.ts";
import { Provider } from "react-redux";

ReactDOM.createRoot(
  document.getElementById("root")! as HTMLElement
).render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <App />
    </Provider>
  </React.StrictMode>
);
