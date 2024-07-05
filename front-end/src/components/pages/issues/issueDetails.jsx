// src/Details.js
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Box,
  Container
} from "@mui/material";
import {
  AccessTime,
  CalendarToday,
  DescriptionOutlined,
  LabelOutlined,
  Update,
  WorkOutline,
} from "@mui/icons-material";
import BOARD_CONSTANT from "../../../constants/board";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { thunks } from "../../../store/projects";

import TaskIcon from "@mui/icons-material/Task";
import BugReportIcon from "@mui/icons-material/BugReport";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AssignmentIcon from "@mui/icons-material/Assignment";

const statusIcons = {
  Task: <TaskIcon style={{ color: "#4caf50" }} />, // Green
  Bugs: <BugReportIcon style={{ color: "#f44336" }} />, // Red
  Problem: <ErrorOutlineIcon style={{ color: "#ff9800" }} />, // Orange
  Change: <AutorenewIcon style={{ color: "#2196f3" }} />, // Blue
  Backlog: <AssignmentIcon style={{ color: "#9e9e9e" }} />, // Grey
};
const IssueDetails = () => {
  const [issueDetails, setIssueDetails] = useState({});
  let [issueId, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiIssueData = useSelector((state) => state.projects.issueDetails);

  useEffect(() => {
    dispatch(
      thunks["project/getIssueById"]({
        id: issueId.get("id"),
      })
    );
  }, []);
  useEffect(() => {
    setIssueDetails(apiIssueData);
  }, [apiIssueData]);
  return (
    <Container maxWidth="false">
      <Card
        variant="outlined"
        sx={{
          padding: "24px",
          borderRadius: "12px",
        }}
      >
        <CardContent>
          <Grid container>
            <Grid item lg={12}>
              <IconButton
                onClick={() => navigate(-1)}
                sx={{ marginBottom: "16px" }}
              >
                <ArrowBackOutlinedIcon />
              </IconButton>
            </Grid>
            <Grid item lg={8}>
              <Typography
                variant="h5"
                component="div"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                {issueDetails.summary}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                gutterBottom
                sx={{ marginBottom: "16px" }}
              >
                {issueDetails.description}
              </Typography>
            </Grid>
            <Grid item lg={4}>
              {issueDetails?.issueType && (
                <Grid container>
                  <Grid item lg={12}>
                    Issue Type:
                  </Grid>
                  <Grid
                    item
                    lg={6}
                    display="flex"
                    alignItems="center"
                    // justifyContent="right"
                  >
                    {statusIcons[issueDetails.issueType]}
                    <Typography
                      variant="h6"
                      fontWeight="600"
                      color="text.secondary"
                      sx={{ mx: 1 }}
                    >
                      {issueDetails.issueType}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Divider sx={{ marginBottom: "24px" }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <LabelOutlined
                  sx={{ marginRight: "8px", color: "primary.main" }}
                />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Issue ID
                  </Typography>
                  <Typography variant="body1">
                    {issueDetails.issueId}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <WorkOutline
                  sx={{ marginRight: "8px", color: "primary.main" }}
                />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Project ID
                  </Typography>
                  <Typography variant="body1">
                    {issueDetails.projectId}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <DescriptionOutlined
                  sx={{ marginRight: "8px", color: "primary.main" }}
                />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status
                  </Typography>
                  <Typography variant="body1">
                    {BOARD_CONSTANT.issueStatusMapper[issueDetails.status] ||
                      issueDetails.status}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <LabelOutlined
                  sx={{ marginRight: "8px", color: "primary.main" }}
                />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Entity ID
                  </Typography>
                  <Typography variant="body1">
                    {issueDetails.entityId}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <CalendarToday
                  sx={{ marginRight: "8px", color: "primary.main" }}
                />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Created At
                  </Typography>
                  <Typography variant="body1">
                    {new Date(issueDetails.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <Update sx={{ marginRight: "8px", color: "primary.main" }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Updated At
                  </Typography>
                  <Typography variant="body1">
                    {new Date(issueDetails.updatedAt).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <AccessTime
                  sx={{ marginRight: "8px", color: "primary.main" }}
                />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Due Date
                  </Typography>
                  <Typography variant="body1">
                    {new Date(issueDetails.dueDate).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default IssueDetails;
