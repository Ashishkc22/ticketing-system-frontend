import "./home.layout.css";
import * as React from "react";
import {
  AppBar,
  Button,
  MenuItem,
  Menu,
  Typography,
  ImageListItem,
  Toolbar,
  Box,
  Grid,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import DropDown from "../DropDown/dropdown";

export default function AppHeader({ Links = [] }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="tool-bar">
          <ImageListItem>
            <Button variant="text">
              <img Button alt="Your logo." src="logo.png" />
            </Button>
          </ImageListItem>
          <Grid container>
            {Links.map((link) => {
              return (
                <Grid key={link.text} item sx={{ mx: 2 }}>
                  {link.type === "drop-down" ? (
                    <DropDown />
                  ) : (
                    <NavLink to={link.path} className="nav-link">
                      <Typography color="primary.light" veriant="h4">
                        {link.text}
                      </Typography>
                    </NavLink>
                  )}
                </Grid>
              );
            })}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
