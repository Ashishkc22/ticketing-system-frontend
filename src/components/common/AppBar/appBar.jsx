import "./home.layout.css";
import { useEffect, useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import authUtil from "../../../utils/auth.util";
import { useNavigate } from "react-router-dom";

import { actions } from "../../../store/common";
import MuiAppBar from "@mui/material/AppBar";
import { isEmpty } from "lodash";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function AppHeader() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const projectsDetails = useSelector((state) => state.common.projectDetails);
  const loginedUserDetails = useSelector((state) => state.common.userDetails);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar className="tool-bar" position="static">
          <IconButton
            onClick={() => dispatch(actions.toggleDrawer())}
            sx={{ mx: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <ImageListItem>
            <Button variant="text">
              <img Button alt="Your logo." src="logo.png" />
            </Button>
          </ImageListItem>
          {!isEmpty(projectsDetails?.selected) && (
            <Box sx={{ minWidth: 150, m: 1 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Your project
                </InputLabel>
                {projectsDetails?.projects?.length && (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={projectsDetails.selected.payload}
                    label="Your project"
                    onChange={(value) => {
                      dispatch(actions.setProject(value.target.value));
                    }}
                  >
                    {projectsDetails.projects.map((project) => (
                      <MenuItem value={project}>{project?.name}</MenuItem>
                    ))}
                  </Select>
                )}
              </FormControl>
            </Box>
          )}
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
              <MenuItem value="setting">
                <SettingsIcon sx={{ mx: 1 }} />
                Settings
              </MenuItem>
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
                sx={{ bgcolor: deepOrange[500] }}
                onClick={() => console.log("hello")}
              >
                {!isEmpty(loginedUserDetails.payload) &&
                  loginedUserDetails?.payload?.email
                    ?.substring(0, 2)
                    ?.toLocaleUpperCase()}
              </Avatar>
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
