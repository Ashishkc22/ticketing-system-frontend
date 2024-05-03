import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Avatar,
  Grid,
  Divider,
  Typography,
} from "@mui/material";
import { actions as commonAction } from "../../../store/common";
import { actions as projectActions } from "../../../store/projects";
import storageUtil from "../../../utils/storage.util";
// import MuiDrawer from "@mui/material/Drawer";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../../store/common";
import HomeIcon from "@mui/icons-material/Home";
import BugReportIcon from "@mui/icons-material/BugReport";
import Toolbar from "@mui/material/Toolbar";
import authUtil from "../../../utils/auth.util";
import { isEmpty } from "lodash";
import { useNavigate, useLocation } from "react-router-dom";
import "./menu.css";
import { deepOrange } from "@mui/material/colors";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LogoutIcon from "@mui/icons-material/Logout";
import clsx from "clsx";

const Item = ({
  text,
  icon,
  navigationPath,
  nav,
  selected,
  style = {},
  clickFunction = () => {},
  defaultAction,
  type,
  useDefaultBehavior = true,
}) => {
  return (
    <ListItem
      button
      onClick={() => {
        if (navigationPath) {
          nav(navigationPath);
        } else {
          clickFunction();
        }
        if (useDefaultBehavior) {
          defaultAction({ text, navigationPath });
        }
      }}
      className={{
        "selected-item": selected,
      }}
      sx={{ display: "flex", ...style }}
    >
      <ListItemIcon button sx={{ display: "flex", justifyContent: "center" }}>
        {icon && icon()}
      </ListItemIcon>
      {text && <ListItemText primary={text} />}
    </ListItem>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  let location = useLocation();
  const isDrawerOpen = useSelector((state) => state.common.isDrawerOpen);
  const selectedProjectsDetails = useSelector(
    (state) => state.projects.projectDetails.selected
  );
  const userDetails = useSelector((state) => state.common.userDetails);
  const selectedMenuPath = useSelector(
    (state) => state.common.selectedMenuPath
  );
  const [listType, setListType] = useState("");
  console.log("Hello menu");
  useEffect(() => {
    setActiveList(menuListDetails.primary);
    setListType("primary");
  }, []);

  const primaryRef = React.useRef(null);
  const secondaryRef = React.useRef(null);
  const nodeRef = listType == "primary" ? primaryRef : secondaryRef;

  const menuListDetails = {
    primary: [
      {
        text: "Issues",
        icon: () => <BugReportIcon />,
        navigationPath: "/project/issues",
      },
      {
        text: "Board",
        icon: () => <BugReportIcon />,
        navigationPath: "/project/Board",
      },
      {
        text: "Backlogs",
        icon: () => <BugReportIcon />,
        navigationPath: "/project/Backlogs",
      },
    ],
  };
  console.log("locationlocation", location);

  const [activeList, setActiveList] = useState([]);
  // const classes = styled();
  //   const [open, setOpen] = React.useState(false);

  // const handleCloseDrawer = () => {};

  const handleCloseDrawer = ({ text, navigationPath }) => {
    dispatch(actions.toggleDrawer());
    if (navigationPath) {
      dispatch(actions.setSelectedMenuPath(navigationPath));
    } else {
    }
  };

  const handleArrowClick = () => {
    const [pop] = activeList;
    dispatch(actions.setSelectedMenuPath(pop.navigationPath));
  };

  console.log("userDetails", userDetails);

  return (
    <Drawer
      open
      sx={{
        width: 230,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 230,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
    >
      {/* <Toolbar > */}
      <Grid container sx={{ p: 1 }}>
        <Grid Item>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>
            {userDetails?.email?.substring(0, 2)?.toLocaleUpperCase()}
          </Avatar>
        </Grid>
        <Grid Item alignContent="center" sx={{ pl: 1 }}>
          {userDetails?.email?.split("@")?.[0]}
        </Grid>
      </Grid>
      <Divider />
      <List sx={{ my: 1 }}>
        <ListItem
          button
          className={clsx(location.pathname === "/project" && "selected-item")}
          onClick={() => {
            nav("/project");
          }}
        >
          <Grid container flex flexDirection="column">
            <Grid item md={12}>
              <Typography variant="h5">
                {selectedProjectsDetails?.name}
              </Typography>
            </Grid>
            {selectedProjectsDetails?.shortDescription && (
              <Grid item md={12}>
                <Typography fontSize={15}>
                  {selectedProjectsDetails?.shortDescription}
                </Typography>
              </Grid>
            )}
          </Grid>
          <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <ArrowForwardIcon fontSize="medium" />
          </ListItemIcon>
        </ListItem>
        {activeList.map((item) => {
          return (
            <Item
              key={item.text}
              nav={nav}
              defaultAction={handleCloseDrawer}
              {...item}
              selected={location.pathname === item.navigationPath}
            />
          );
        })}
      </List>
      <List
        sx={{
          position: "absolute",
          bottom: "0",
          width: "-webkit-fill-available",
        }}
      >
        <Divider />
        <ListItem
          button
          onClick={() => {
            nav("/");
          }}
        >
          <ListItemIcon
            sx={
              {
                // display: "flex",
                // justifyContent: "flex-start",
                // alignItems: "center",
              }
            }
          >
            <KeyboardArrowLeftIcon fontSize="medium" />
          </ListItemIcon>
          <Grid container>
            <Grid item md={12}>
              <Typography variant="h5">Projects</Typography>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem
          button
          onClick={() => {
            dispatch(commonAction.toggleIsUserLoggedIn());
            authUtil.clearCookies();
            storageUtil.eraseStroageData();
            dispatch(projectActions.setProject({}));
            nav("/auth/login");
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Grid container>
            <Grid item md={12}>
              <Typography variant="h5">Logout</Typography>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default App;
