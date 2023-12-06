import { useEffect } from "react";
import Card from "../../common/Card/Card";
import Grid from "@mui/material/Grid";
import { thunks, actions as commonActions } from "../../../store/common";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

export default function Home() {
  const theme = useTheme();
  const projectsDetails = useSelector((state) => state.common.projectDetails);
  console.log("Reedux Projects=>>>>>", projectsDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thunks["projects/getProjects"]());
  }, []);

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
      {projectsDetails?.projects?.length &&
        projectsDetails.projects.map((project) => (
          <Grid item>
            <Card
              width={240}
              isLoading={projectsDetails?.isProjectsLoading}
              projectName={project.name}
              action={() => {
                dispatch(commonActions.setProject(project));
              }}
            />
          </Grid>
        ))}
    </Grid>
  );
}
