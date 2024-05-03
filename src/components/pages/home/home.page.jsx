import { useEffect, useState } from "react";
import Card from "../../common/Card/Card";
import Grid from "@mui/material/Grid";
import { thunks, actions as projectActions } from "../../../store/projects";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import ProjectForm from "../projectDetails/addEditProjectForm";
import Typography from "@mui/material/Typography";
import MUCard from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import storage from "../../../utils/storage.util";

import Dialog from "@mui/material/Dialog";
import "./home.css";

export default function Home() {
  const theme = useTheme();
  const nav = useNavigate();
  const [isProjectFormOpen, setProjectFormState] = useState(false);
  const projectsDetails = useSelector((state) => state.projects.projectDetails);
  const isNewProjectSubmitted = useSelector(
    (state) => !state.projects.isProjectSubmitted
  );
  const dispatch = useDispatch();

  function closeDialog() {
    setProjectFormState(false);
    dispatch(thunks["projects/getProjects"]());
  }

  useEffect(() => {
    dispatch(thunks["projects/getProjects"]());
  }, []);

  const deleteAction = (id) => {
    dispatch(thunks["projects/deleteProjectByID"]({id}));
    dispatch(thunks["projects/getProjects"]());
  }

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
          <Grid
            item
            xs={6}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          ></Grid>
        </Grid>
      </Grid>

      {/* display projects */}
      <Grid item>
        <MUCard>
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
      {projectsDetails?.projects?.length
        ? projectsDetails.projects.map((project) => (
            <Grid item key={project.name}>
              <Card
                width={240}
                isLoading={projectsDetails?.isProjectsLoading}
                projectName={project.name}
                action={() => {
                  storage.setStorageData(project, "selectedProject");
                  dispatch(projectActions.setProject(project));
                  nav("project");
                }}
                editAction={() => {
                  console.log('project._id',project._id);
                  nav(`/add-edit-project?id=${project._id}`);
                }}
                id={project._id}
                deleteAction={deleteAction}
                isSelected={project?._id === projectsDetails?.selected?._id}
              />
            </Grid>
          ))
        : null}
    </Grid>
  );
}
