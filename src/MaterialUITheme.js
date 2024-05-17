import { createTheme } from "@mui/material";

// const fonts = ["Roboto", "Helvetica", "Arial", 'sans-serif'];
const fonts = ["Dosis", "Arial", "Roboto"]

export default {
  LightTheme: createTheme({
    palette: {
      mode: "light",
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
        alert: "#ff0000",
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
      h1: {
        fontSize: '3rem',
        fontWeight: 300,
      },
      // h2: {
      //   fontSize: '2.5rem',
      //   fontWeight: 300,
      // },
      // h3: {
      //   fontSize: '2rem',
      //   fontWeight: 400,
      // },
      // h4: {
      //   fontSize: '1.75rem',
      //   fontWeight: 400,
      // },
      // h5: {
      //   fontSize: '1.5rem',
      //   fontWeight: 400,
      // },
      // h6: {
      //   fontSize: '1.25rem',
      //   fontWeight: 500,
      // },
      // subtitle1: {
      //   fontSize: '1rem',
      //   fontWeight: 500,
      // },
      // body1: {
      //   fontSize: '1rem',
      //   fontWeight: 400,
      // },
      // button: {
      //   fontSize: '0.875rem',
      //   fontWeight: 500,
      //   textTransform: 'none', // Optional, to keep the text case as is
      // },
      // caption: {
      //   fontSize: '0.875rem',
      //   fontWeight: 400,
      //   textDecoration: 'underline', // Optional, for link styling
      // },
      // // Custom highlight style
      // highlight: {
      //   fontSize: '1rem',
      //   fontWeight: 700,
      // },
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
