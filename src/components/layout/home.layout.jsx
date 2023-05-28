import { useLocation, Outlet } from "react-router-dom";
import AppBar from "../common/AppBar/appBar";
import { ThemeProvider } from "@mui/material/styles";
import Themes from "../../MaterialUITheme";
export function Home() {
  const location = useLocation();
  const Links = [
    {
      text: "Home",
      path: "/login",
    },
  ];
  return (
    <>
      <ThemeProvider theme={Themes.LightTheme}>
        <AppBar Links={Links} />
      </ThemeProvider>
      <Outlet />
    </>
  );
}
