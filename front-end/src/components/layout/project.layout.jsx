import { Box, Grid, Container } from "@mui/material";
import Menu from "../../components/common/Menu/menu";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import tokenUtil from "../../utils/token.util";
import storage from "../../utils/storage.util";
import { actions } from "../../store/common";
import { actions as projectActions } from "../../store/projects";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";

export function Project() {
  const userDetails = useSelector((state) => state.common.userDetails);
  const nav = useNavigate();
  const selectedProject = useSelector(
    (state) => state.projects?.projectDetails?.selected
  );
  const dispatch = useDispatch();
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
    if (isEmpty(selectedProject)) {
      const selectedProject = storage.getStorageData("selectedProject");
      dispatch(projectActions.setProject(selectedProject));
    }
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <Menu />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${240}px)` } }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
