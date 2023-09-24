import { Outlet } from "react-router-dom";
import Menu from "../../components/common/Menu/menu";
import AppBar from "../common/AppBar/appBar";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export function Home() {
  return (
    <Box>
      <AppBar />
      <Menu />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        <Container sx={{ my: 2, px: 0 }} maxWidth="false">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
