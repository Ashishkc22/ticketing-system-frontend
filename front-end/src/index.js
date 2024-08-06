import React, { useState } from "react";
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
import TrapFocus from "@mui/material/Unstable_TrapFocus";
import Paper from "@mui/material/Paper";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NoteOutlinedIcon from "@mui/icons-material/NoteOutlined";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const container = document.getElementById("root");
const root = createRoot(container);

function ProjectInfo() {
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(true);
  return (
    <TrapFocus open disableAutoFocus disableEnforceFocus>
      <Fade appear={false} in={isInfoDialogOpen}>
        <Paper
          role="dialog"
          aria-modal="false"
          aria-label="Cookie banner"
          square
          variant="outlined"
          tabIndex={-1}
          sx={{
            maxWidth: "50%",
            position: "fixed",
            top: 0,
            left: "20%",
            right: 0,
            m: 0,
            p: 2,
            borderWidth: 0,
            borderTopWidth: 1,
            zIndex: 1,
            background: "#d3ffd6",
            borderRadius: "30px",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            gap={2}
          >
            <NoteOutlinedIcon sx={{ color: "orange", alignSelf: "center" }} />

            <Box
              sx={{
                flexShrink: 1,
                alignSelf: { xs: "flex-start", sm: "center" },
              }}
            >
              <Typography>
                This is a simple ticket management system. We used{" "}
                <span style={{ fontWeight: "bold" }}> React.js </span> for the
                frontend and{" "}
                <span style={{ fontWeight: "bold" }}> Node.js </span> with{" "}
                <span style={{ fontWeight: "bold" }}>Express </span> for the
                backend, and MongoDB for the database. The frontend is deployed
                on <span style={{ fontWeight: "bold" }}>Netlify</span>, and the
                backend is deployed on{" "}
                <span style={{ fontWeight: "bold" }}>Render</span>.
              </Typography>
            </Box>
            <Stack
              gap={2}
              direction={{
                xs: "row-reverse",
                sm: "row",
              }}
              sx={{
                flexShrink: 0,
                alignSelf: { xs: "flex-end", sm: "center" },
              }}
            >
              <IconButton onClick={() => setIsInfoDialogOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Paper>
      </Fade>
    </TrapFocus>
  );
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={Themes.LightTheme}>
        <SnackbarProvider
          maxSnack={4}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          autoHideDuration="2000"
        >
          <ProjectInfo />
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
