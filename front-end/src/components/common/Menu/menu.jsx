import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Grid,
  Divider,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { actions as commonAction } from "../../../store/common";
import { actions as projectActions } from "../../../store/projects";
import storageUtil from "../../../utils/storage.util";
import MuiDrawer from "@mui/material/Drawer";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../../store/common";
import authUtil from "../../../utils/auth.util";
import { useNavigate, useLocation } from "react-router-dom";
import "./menu.css";
import clsx from "clsx";

const drawerWidth = 190;

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
      sx={{
        display: "flex",
        ...style,
        ...(selected && { background: "#b6a3e5a1" }),
        borderRadius: "30px",
      }}
    >
      <ListItemIcon
        button
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {icon && <img width="27px" src={icon}></img>}
      </ListItemIcon>
      {text && (
        <ListItemText>
          <Typography sx={{ fontWeight: 600 }}>{text}</Typography>
        </ListItemText>
      )}
    </ListItem>
  );
};

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const App = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  let location = useLocation();
  const [open, setOpen] = useState(true);
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

  const menuListDetails = {
    primary: [
      {
        text: "Issues",
        icon: "/menu-icons/issue.ico",
        navigationPath: "/project/issues",
      },
      {
        text: "Board",
        icon: "/menu-icons/board.ico",
        navigationPath: "/project/Board",
      },
      {
        text: "Backlogs",
        icon: "/menu-icons/backlog.ico",
        navigationPath: "/project/Backlogs",
      },
    ],
  };
  const truncateSummary = (summary, maxLength = 10) => {
    if (!summary) {
      return "";
    }
    if (summary.length > maxLength) {
      return summary.substring(0, maxLength) + "...";
    }
    return summary;
  };

  const [activeList, setActiveList] = useState([]);
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

  return (
    <Drawer
      open={open}
      variant="permanent"
      anchor="left"
    >
      <Grid
        container
        sx={{ mr: 1 }}
        justifyContent="center"
        alignItems="center"
        columnSpacing="6"
      >
        <Grid item>
          <Avatar sx={{ bgcolor: "#6addb2" }}>
            {userDetails?.email?.substring(0, 2)?.toLocaleUpperCase()}
          </Avatar>
        </Grid>
        <Grid item alignContent="center" sx={{ my: 1 }}>
          <Typography fontWeight={500}>
            {userDetails?.email?.split("@")?.[0]}
          </Typography>
          <Typography fontSize="10px" fontWeight={500}>
            {userDetails.id}
          </Typography>
        </Grid>
        <Grid item alignContent="center"></Grid>
        <Grid item display="flex" alignItems="center"></Grid>
      </Grid>
      <Divider />
      <List sx={{ my: 1 }}>
        <ListItem
          button
          className={clsx(
            location.pathname === "/project/projectDetails" && "selected-item"
          )}
          sx={{
            ...(location.pathname === "/project/projectDetails" && {
              background: "#0000e236",
            }),
            borderRadius: "20px"
          }}
          onClick={() => {
            nav("/project/projectDetails");
          }}
        >
          <Grid container flex flexDirection="column">
            <Grid item md={12}>
              <Typography variant="h5">
                {truncateSummary(selectedProjectsDetails?.name)}
              </Typography>
            </Grid>
            {selectedProjectsDetails?.shortDescription && (
              <Grid item md={12}>
                <Typography fontSize={15}>
                  {truncateSummary(
                    selectedProjectsDetails?.shortDescription,
                    20
                  )}
                </Typography>
              </Grid>
            )}
          </Grid>
          {/* <ListItemIcon
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              // ...(location.pathname === "/project/projectDetails" && {
              //   color: "blue",
              // }),
            }}
          >
            <img src="/action-icons/right-nav.png" alt="right" width="27px" />
          </ListItemIcon> */}
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
        {/* <Divider sx={{ mb: 2 }}/> */}
        <ListItem
          button
          sx={{ borderRadius: "30px" }}
          onClick={() => {
            nav("/");
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: "30px",
              mx: 2,
            }}
          >
            <img src="/action-icons/left-nav.ico" alt="left" width="27px" />
          </ListItemIcon>
          <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
            Projects
          </Typography>
        </ListItem>
        <ListItem
          button
          sx={{ borderRadius: "30px" }}
          onClick={() => {
            dispatch(commonAction.toggleIsUserLoggedIn());
            authUtil.clearCookies();
            storageUtil.eraseStroageData();
            dispatch(projectActions.setProject({}));
            nav("/auth/login");
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: "30px",
              mx: 2,
            }}
          >
            <img src="/action-icons/logout.ico" alt="logout" width="27px" />
          </ListItemIcon>
          <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
            Logout
          </Typography>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default App;
