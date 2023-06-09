import { createTheme } from "@mui/material";

const fonts = ["Dosis", "Arial", "Roboto"];

export default {
  LightTheme: createTheme({
    palette: {
      mode: "light",
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
    typography: {
      fontFamily: fonts.join(","),
    },
  }),
  DarkTheme: createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      fontFamily: fonts.join(","),
    },
  }),
};
