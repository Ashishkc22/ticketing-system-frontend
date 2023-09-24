import React, { useEffect } from "react";
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
import Toolbar from "@mui/material/Toolbar";
// const drawerWidth = 140;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// const ItemIcon = styled()()=>{

// }

// import { makeStyles } from "@mui/styles";
// import MenuIcon from "@material-ui/icons/Menu";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";

// const useStyles = makeStyles((theme) => ({
//   drawer: {
//     width: 250,
//   },
// }));

const Item = ({ close }) => {
  return (
    <ListItem button onClick={close} sx={{ display: "flex" }}>
      <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector((state) => state.common.isDrawerOpen);
  // const classes = styled();
  //   const [open, setOpen] = React.useState(false);

  useEffect(() => {
    // dispatch();
  }, []);

  const handleCloseDrawer = () => {
    dispatch(actions.toggleDrawer());
    // setOpen(false);
  };

  return (
    <Drawer open={isDrawerOpen} anchor="left" onClose={handleCloseDrawer}>
      <Toolbar />
      <div
      // className={classes.drawer}
      >
        <List sx={{ width: "200px", my: 1 }}>
          <Item close={handleCloseDrawer}> </Item>
        </List>
      </div>
    </Drawer>
  );
};

export default App;
