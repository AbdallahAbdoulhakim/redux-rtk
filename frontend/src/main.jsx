import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "flowbite";
import App from "./App.jsx";
import store from "./app/store.js";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>
);
