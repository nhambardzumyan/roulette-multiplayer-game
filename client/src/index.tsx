import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import App from "./App";

import "./styles.css";

const rootElement = document.getElementById("app");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
