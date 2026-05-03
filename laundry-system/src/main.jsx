import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { LaundryProvider } from "./context/LaundryContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LaundryProvider>
    <App />
  </LaundryProvider>
  </React.StrictMode>
);


