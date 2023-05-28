import "./home.layout.css";
import * as React from "react";
import {
  AppBar,
  MenuItem,
  Menu,
  Typography,
  ImageListItem,
  Toolbar,
  Box,
  Grid,
} from "@mui/material";
import { NavLink } from "react-router-dom";

export default function AppHeader({ Links = [] }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  console.log("Links", Links);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="tool-bar">
          <ImageListItem>
            <Box
              component="img"
              sx={{
                height: "9vh",
                pl: "14vh",
              }}
              alt="Your logo."
              src="logo.png"
            />
          </ImageListItem>
          <Menu open={true}>
            {Links.map((link) => {
              return (
                <MenuItem key={link.text}>
                  <NavLink to={link.path}>
                    <Typography variant="subtitle1">{link.text}</Typography>
                  </NavLink>
                </MenuItem>
              );
            })}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
