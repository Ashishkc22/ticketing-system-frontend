import React, { useEffect, useState } from "react";
import Card from "../../common/Card/Card";
import Grid from "@mui/material/Grid";
import { thunks, actions as projectActions } from "../../../store/projects";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import ProjectForm from "../projectDetails/addEditProjectForm";
import Typography from "@mui/material/Typography";
import MUCard from "@mui/material/Card";
import { CardActionArea, IconButton, Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import CheckIcon from '@mui/icons-material/Check';
import storage from "../../../utils/storage.util";

export default function Home() {
  const theme = useTheme();
  const nav = useNavigate();
  const [isProjectFormOpen, setProjectFormState] = useState(false);
  const projectsDetails = useSelector((state) => state.projects.projectDetails);
  const isNewProjectSubmitted = useSelector(
    (state) => !state.projects.isProjectSubmitted
  );
  const dispatch = useDispatch();
  const [selectMode, setSelectMode] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState([]);

  function closeDialog() {
    setProjectFormState(false);
    dispatch(thunks["projects/getProjects"]());
  }

  useEffect(() => {
    dispatch(thunks["projects/getProjects"]());
  }, []);

  const deleteAction = (id) => {
    dispatch(thunks["projects/deleteProjectByID"]({ id }));
    dispatch(thunks["projects/getProjects"]());
  };

  function stringToGradient(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let r = (hash & 0xFF0000) >> 16;
    let g = (hash & 0x00FF00) >> 8;
    let b = hash & 0x0000FF;
    let gradient = `linear-gradient(135deg, rgb(${r}, ${g}, ${b}), rgb(${g}, ${b}, ${r}))`;
    return gradient;
  }

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    setSelectedProjects([]); // Reset selected projects when exiting select mode
  };

  const toggleSelectProject = (projectId) => {
    if (selectedProjects.includes(projectId)) {
      setSelectedProjects(selectedProjects.filter((id) => id !== projectId));
    } else {
      setSelectedProjects([...selectedProjects, projectId]);
    }
  };

  const isSelected = (projectId) => selectedProjects.includes(projectId);

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      sx={{
        [theme.breakpoints.only("xs")]: { justifyContent: "center" },
        [theme.breakpoints.up("xs")]: { justifyContent: "flex-start" },
      }}
      alignItems="center"
    >
      <Grid item xs={11}>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item xs={6}>
            <Typography gutterBottom variant="h4" component="div">
              Projects
            </Typography>
          </Grid>
          {/* create project button */}
          <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={toggleSelectMode}>
              {selectMode ? (
                <Typography variant="body1">Cancel</Typography>
              ) : (
                <Typography variant="body1">Select</Typography>
              )}
            </IconButton>
          </Grid>
        </Grid>
      </Grid>

      {/* create new project card */}
      <Grid item>
        <MUCard
          sx={{
            borderRadius: 3,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          <CardActionArea
            sx={{
              display: "flex",
              alignItems: "center",
              height: 210,
              width: 240,
            }}
            onClick={() => nav("/add-edit-project")}
          >
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <AddIcon sx={{ fontSize: 80, color: "#0000004d" }} />
            </CardContent>
          </CardActionArea>
        </MUCard>
      </Grid>

      {/* display projects */}
      {projectsDetails?.projects?.length
        ? projectsDetails.projects.map((project) => (
            <Grid item key={project.name}>
              <MUCard
                sx={{
                  width: 240,
                  height: 210,
                  borderRadius: 3,
                  background: stringToGradient(project.name),
                  color: "#fff",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  border: selectMode && isSelected(project._id) ? "2px solid blue" : "none",
                  position: "relative",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  },
                }}
                onClick={() => {
                  if (selectMode) {
                    console.log('project',project);
                    toggleSelectProject(project._id);
                  } else {
                    storage.setStorageData(project, "selectedProject");
                    dispatch(projectActions.setProject(project));
                    nav("project");
                  }
                }}
              >
                {selectMode && isSelected(project._id) && (
                  <Badge
                    color="primary"
                    badgeContent={<CheckIcon sx={{ fontSize: "15px" }}/>}
                    sx={{ position: "absolute", top: 12, right: 20}}
                  />
                )}
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "base-line",
                    height: "100%",
                  }}
                >
                  <Typography variant="h5" component="div">
                    {project.name}
                  </Typography>
                </CardContent>
              </MUCard>
            </Grid>
          ))
        : null}
    </Grid>
  );
}
