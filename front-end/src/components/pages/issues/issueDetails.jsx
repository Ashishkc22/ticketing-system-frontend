// src/Details.js
import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Grid,
  Divider,
  Box,
  Container,
} from "@mui/material";
import BOARD_CONSTANT from "../../../constants/board";
import { useNavigate, useSearchParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { thunks } from "../../../store/projects";

const statusIcons = {
  Task: "/task.png", // Green
  Bugs: "/bug.png", // Red
  Problem: "/warning.png", // Orange
  Change: "/exchange.png", // Blue
  Backlog: "/backlog-form.png", // Grey
};
const IssueDetails = () => {
  const [issueDetails, setIssueDetails] = useState({});
  let [issueId] = useSearchParams();
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
    <Container maxWidth="false" sx={{ mt:2 }}>
      <Card
        variant="outlined"
        sx={{
          py: "20px",
          borderRadius: "21px",
        }}
      >
        {/* <CardContent> */}
        <Grid container>
          <Grid item sx={{ m:1 }}>
            <IconButton onClick={() => navigate(-1)}>
              <img src="/action-icons/left-nav.png" alt="left" width="27px" />
            </IconButton>
          </Grid>
          <Grid item xs={8}>
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
          <Grid item xs={3}>
            {issueDetails?.issueType && (
              <Grid container>
                <Grid item alignContent="center" xs={3} >
                  Issue Type:
                </Grid>
                <Grid
                  item
                  lg={6}
                  display="flex"
                  alignItems="center"
                  sx={{ mx:1 }}
                >
                  <img src={statusIcons[issueDetails.issueType]} alt="status" width="20px" />
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
        <Grid container sx={{ m: 1 }} spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center">
              <img
                style={{ marginRight: "8px", color: "primary.main" }}
                src="/ID (1).png"
                alt="ID"
              />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Issue ID
                </Typography>
                <Typography variant="body1">{issueDetails.issueId}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center">
            <img
                style={{ marginRight: "8px", color: "primary.main",width:"27px" }}
                src="/ID.png"
                alt="ID"
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
            <img
                style={{ marginRight: "8px", color: "primary.main",width:"27px" }}
                src="/clipboard.png"
                alt="clipboard"
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
            <img
                style={{ marginRight: "8px", color: "primary.main",width:"27px" }}
                src="/ID.png"
                alt="ID"
              />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Entity ID
                </Typography>
                <Typography variant="body1">{issueDetails.entityId}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center">
            <img
                style={{ marginRight: "8px", color: "primary.main",width:"27px" }}
                src="/date-time.png"
                alt="dateTime"
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
            <img
                style={{ marginRight: "8px", color: "primary.main",width:"27px" }}
                src="/clock.png"
                alt="clock"
              />
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
            <img
                style={{ marginRight: "8px", color: "primary.main",width:"27px" }}
                src="/last-minute.png"
                alt="dueDate"
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
        {/* </CardContent> */}
      </Card>
    </Container>
  );
};

export default IssueDetails;
