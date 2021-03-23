import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { PlacesProvider } from "./context/PlacesContext";

ReactDOM.render(
    <React.StrictMode>
        <PlacesProvider>
            <App />
        </PlacesProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
