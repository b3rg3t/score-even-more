import React from "react";
import ReactDOM from "react-dom/client";
import { setupStore } from "../src/store/redux/store.ts";
import { Provider } from "react-redux";
import { text } from "./localization/eng.ts";


import { Layout } from "./layout/Layout.tsx";
import { Pages } from "./pages/Pages.tsx";
import "./styles/App.scss";

const root = document.getElementById("root");

if (!root) {
  throw new Error(text.errors.root);
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Layout>
      <Provider store={setupStore()}>
        <Pages />
      </Provider>
    </Layout>
  </React.StrictMode>
);
