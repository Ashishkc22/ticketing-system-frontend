import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material/styles";
import Themes from "./MaterialUITheme";
import "./index.css";
import { store } from "./store";
import router from "./router";
import { SnackbarProvider } from "notistack";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={Themes.LightTheme}>
        <SnackbarProvider
          maxSnack={4}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          autoHideDuration="2000"
        >
          <RouterProvider router={router} />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// "eslintConfig": {
//   "extends": [
//     "react-app",
//     "react-app/jest"
//   ]
// },

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
