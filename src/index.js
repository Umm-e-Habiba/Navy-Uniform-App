import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./generic.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { CustomTheme } from "./muiStyles";
import store from "./store/store";
import { Provider } from "react-redux";
import "core-js/stable";
import "regenerator-runtime/runtime";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={CustomTheme}>
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
