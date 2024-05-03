import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Modal,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import CreateIssue from "../issues/addEditIssue";
import { useState } from "react";

export default function ProjectDetails() {
  const projectDetails = useSelector(
    (state) => state.projects?.projectDetails?.selected
  );

  const [isNewIssueModalOpen, setNewIssueModalState] = useState(false)

  return (
    <Card sx={{ m: 3 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Typography variant="h3" component="div">
              {projectDetails.name}
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
              {projectDetails.shortDescription}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={()=> setNewIssueModalState(true)}>
              Create Issue
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography
              gutterBottom
              sx={{ fontSize: "20px", fontWeight: "600" }}
              component="div"
            >
              Description
            </Typography>

            <Typography
              gutterBottom
              sx={{
                fontSize: "15px",
                fontWeight: "500",
                "max-width": "400px",
                overflow: "overlay",
              }}
              component="div"
            >
              {projectDetails.description}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Modal open={isNewIssueModalOpen} onClose={()=> setNewIssueModalState(false)}>
       <CreateIssue closeModal={() => setNewIssueModalState(false)}/>
      </Modal>
    </Card>
  );
}
