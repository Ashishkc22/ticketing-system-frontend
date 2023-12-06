import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
} from "@mui/material";
// import MuiDrawer from "@mui/material/Drawer";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../../store/common";
import HomeIcon from "@mui/icons-material/Home";
import BugReportIcon from "@mui/icons-material/BugReport";
import Toolbar from "@mui/material/Toolbar";
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import "./menu.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { SwitchTransition, CSSTransition } from "react-transition-group";

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
        // "menu-item-open": type,
        // "menu-item-closed": !type,
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
  const isDrawerOpen = useSelector((state) => state.common.isDrawerOpen);
  const selectedProjectsDetails = useSelector(
    (state) => state.common.projectDetails.selected
  );
  const selectedMenuPath = useSelector(
    (state) => state.common.selectedMenuPath
  );
  const [listType, setListType] = useState("");

  const toggleList = () => {
    const list =
      listType === "secondary"
        ? menuListDetails.primary
        : menuListDetails.secondary;
    setActiveList(list);
    const [pop] = list;
    dispatch(actions.setSelectedMenuPath(pop.navigationPath));
    setListType(listType === "secondary" ? "primary" : "secondary");
  };

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
        text: "Home",
        icon: () => <HomeIcon />,
        navigationPath: "/",
      },
    ],
    secondary: [
      {
        text: "Issues",
        icon: () => <BugReportIcon />,
        navigationPath: "/issues",
      },
    ],
  };

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

  return (
    <Drawer
      open={isDrawerOpen}
      anchor="left"
      onClose={() => dispatch(actions.toggleDrawer())}
      style={{ background: "#efefef" }}
    >
      <Toolbar />
      <div
      // className={classes.drawer}
      >
        <List sx={{ width: "200px", my: 1 }}>
          {!isEmpty(selectedProjectsDetails) && (
            <Item
              nav={nav}
              defaultAction={handleCloseDrawer}
              icon={
                listType === "primary"
                  ? () => (
                      <ArrowForwardIosIcon onClick={() => handleArrowClick()} />
                    )
                  : () => (
                      <ArrowBackIosIcon onClick={() => handleArrowClick()} />
                    )
              }
              clickFunction={() => toggleList()}
              style={{
                width: "fit-content",
                padding: "0px",
                borderRadius: "20px",
                py: 1,
                justifyContent: "flex-end",
                left: "160px",
              }}
              useDefaultBehavior={false}
              type={listType === "primary"}
            />
          )}
          <div
            style={{ left: "-100%", position: "relative" }}
            className="menu-item-silde"
            ref={nodeRef}
          >
            {activeList.map((item) => {
              return (
                <Item
                  nav={nav}
                  defaultAction={handleCloseDrawer}
                  {...item}
                  type={listType === "primary"}
                  selected={selectedMenuPath === item.navigationPath}
                />
              );
            })}
          </div>
        </List>
      </div>
    </Drawer>
  );
};

export default App;
