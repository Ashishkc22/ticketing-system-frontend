import { createTheme } from "@mui/material";

const fonts = ["Dosis", "Arial", "Roboto"];

export default {
  LightTheme: createTheme({
    typography: {
      fontFamily: fonts.join(","),
    },
  }),
  DarkTheme: createTheme({
    typography: {
      fontFamily: fonts.join(","),
    },
  }),
};
