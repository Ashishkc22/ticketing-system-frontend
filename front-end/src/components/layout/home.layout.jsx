import { Outlet, useRouteError, isRouteErrorResponse } from "react-router-dom";
// import Menu from "../../components/common/Menu/menu";
import AppBar from "../common/AppBar/appBar";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import tokenUtil from "../../utils/token.util";
import { actions } from "../../store/common";
import { isEmpty } from "lodash";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import authUtil from "../../utils/auth.util";
import Avatar from "@mui/material/Avatar";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate, useLocation } from "react-router-dom";

export function Home() {
  const dispatch = useDispatch();
  const error = useRouteError();
  const nav = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const loginedUserDetails = useSelector((state) => state.common.userDetails);

  const userDetails = useSelector((state) => state.common.userDetails);
  useEffect(() => {
    if (isEmpty(userDetails)) {
      const token = tokenUtil.getAuthToken();
      if (token) {
        const userDetails = tokenUtil.getTokenDetails(token);
        dispatch(actions.setLoggedInUserDetails(userDetails));
      } else {
        nav("/auth/login");
      }
    }
  }, []);
  return (
    <Grid>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* <DrawerHeader /> */}
        {location.pathname != "/" ? (
          <Grid container>
            <AppBar />
          </Grid>
        ) : (
          <Grid container sx={{ flexDirection: "row-reverse" }}>
            <Grid item>
              <IconButton onClick={() => setIsMenuOpen(true)}>
                <Avatar sx={{ bgcolor: "#6addb2" }}>
                  {isEmpty(loginedUserDetails?.email) ? (
                    loginedUserDetails?.email
                      ?.substring(0, 2)
                      ?.toLocaleUpperCase()
                  ) : (
                    <PersonOutlineIcon sx={{ fontSize: 30 }} />
                  )}
                </Avatar>
              </IconButton>
            </Grid>
            <Grid item>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
              >
                <MenuItem
                  onClick={() => {
                    dispatch(actions.toggleIsUserLoggedIn());
                    authUtil.clearCookies();
                    nav("/auth/login");
                  }}
                >
                   <img style={{ marginRight:5}} src="/action-icons/logout.ico" alt="logout" width="27px" />
                  Logout
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        )}

        <Container sx={{ my: 2, px: 0 }} maxWidth="false" padding="0">
          <Outlet />
        </Container>
      </Box>
    </Grid>
  );
}
