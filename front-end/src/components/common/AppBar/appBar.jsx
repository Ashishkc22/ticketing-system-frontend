import "./home.layout.css";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Button,
  ImageListItem,
  Toolbar,
  Box,
  Grid,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector, useDispatch } from "react-redux";
import authUtil from "../../../utils/auth.util";
import { useNavigate, NavLink, useLocation } from "react-router-dom";

import { actions } from "../../../store/common";
import AppBar from "@mui/material/AppBar";
import clsx from "clsx";
import { divide, isEmpty } from "lodash";

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

export default function AppHeader() {
  const pages = [
    {
      name: "Projects",
      link: "/",
    },
  ];
  const location = useLocation();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const projectsDetails = useSelector((state) => state.projects.projectDetails);
  const loginedUserDetails = useSelector((state) => state.common.userDetails);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar  position="static">
        <Toolbar className="tool-bar" >
          <Box>
            <IconButton>
              <ArrowBackIcon onClick={() => nav(-1)}/>
            </IconButton>
            {/* {pages.map((page) => (
              <NavLink
                key={page.name}
                to={page.link}
                sx={{
                  my: 2,
                  width: "80px",
                  display: "flex",
                  justifyContent: "center",
                }}
                className={clsx(
                  "links",
                  location.pathname === "/" && "selected-link"
                )}
              >
                <Typography
                  gutterBottom
                  sx={{ fontWeight: 600, fontSize: "large" }}
                >
                  {page.name}
                </Typography>
              </NavLink>
            ))} */}
          </Box>

          {/* Profile Menu */}
          <Grid container sx={{ flexDirection: "row-reverse" }}>
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
              {/* <MenuItem value="setting">
                <SettingsIcon sx={{ mx: 1 }} />
                Settings
              </MenuItem> */}
              <MenuItem
                onClick={() => {
                  dispatch(actions.toggleIsUserLoggedIn());
                  authUtil.clearCookies();
                  nav("/auth/login");
                }}
              >
                <LogoutIcon sx={{ mx: 1 }} />
                Logout
              </MenuItem>
            </Menu>
            <IconButton onClick={() => setIsMenuOpen(true)}>
              <Avatar
                sx={{ bgcolor: "#6addb2" }}
                onClick={() => console.log("hello")}
              >
                {
                  /* {!isEmpty(loginedUserDetails.payload) && */
                  loginedUserDetails?.email
                    ?.substring(0, 2)
                    ?.toLocaleUpperCase()
                }
              </Avatar>
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
