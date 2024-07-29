import {
  Card,
  Typography,
  CardContent,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunks } from "../../../store/projects";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function AddEditIssue({ closeModal, issueData }) {
  const dispatch = useDispatch();
  const inEditMode = !isEmpty(issueData);
  const [formDetails, setFormDetails] = useState({
    _id: "",
    issueType: issueData?.issueType || "",
    summary: issueData?.summary || "",
    dueDate: issueData?.dueDate || "",
    description: issueData?.description || "",
    status: issueData?.status || "Pending",
  });
  const [errorMessages, setErrorMessages] = useState({
    _id: "",
    issueType: "",
    summary: "",
    dueDate: "",
    description: "",
    status: "",
  });
  const projectList = useSelector(
    (state) => state.projects.projectDetails.projects
  );
  const currentProjectDetails = useSelector(
    (state) => state.projects.projectDetails.selected
  );

  const validateForm = () => {
    const errors = {};

    if (!formDetails.issueType) {
      errors.issueType = "Issue type is required";
    }
    if (!formDetails.summary) {
      errors.summary = "Summary is required";
    }
    if (!formDetails.dueDate) {
      errors.dueDate = "Due date is required";
    }
    if (!formDetails.description) {
      errors.description = "Description is required";
    }
    if (!formDetails.status) {
      errors.status = "Status is required";
    }
    setErrorMessages(errors);
    return isEmpty(errors);
  };

  const handleFormSubmission = (toClose) => {
    if (validateForm()) {
      const formData = { ...formDetails, projectId: formDetails._id };
      delete formData._id;
      dispatch(thunks["projects/addEditIssue"]({ ...(inEditMode && { issueId: issueData._id} ),data: formData }))
        .then(() => {
          setFormDetails({
              issueType: "",
              summary: "",
              dueDate: "",
              description: "",
            });
          if (toClose) {
            closeModal();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleInputChange = (field, value) => {
    setFormDetails({ ...formDetails, [field]: value });
    setErrorMessages({ ...errorMessages, [field]: "" }); // Clear error message when field changes
  };

  useEffect(() => {
    if (isEmpty(projectList)) {
      console.log("call project details");
      dispatch(thunks["projects/getProjects"]());
    }
  }, []);
  useEffect(() => {
    if (!isEmpty(issueData)) {
      console.log("edit issueData", issueData);
      setFormDetails({
        _id: currentProjectDetails._id,
        issueType: issueData?.issueType || "",
        summary: issueData?.summary || "",
        dueDate: issueData?.dueDate || "",
        description: issueData?.description || "",
        status: issueData?.status || "",
      });
    }
  }, [issueData]);

  const truncateSummary = (summary) => {
    if(!summary){
      return ""
    }
    const maxLength = 40; // Adjust the maximum length as needed
    if (summary.length > maxLength) {
      return summary.substring(0, maxLength) + "...";
    }
    return summary;
  };

  useEffect(() => {
    setFormDetails({
      ...formDetails,
      _id: currentProjectDetails._id,
    });
  }, [projectList]);

  return (
    <Card
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700,
        borderRadius: "21px",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography variant="h5">Create Issue</Typography>
      <CardContent sx={{ marginTop: 5 }}>
        <Grid container direction="column" rowGap={2}>
          <Grid item>
            <FormControl sx={{ minWidth: 290 }}>
              <InputLabel id="Projects">Projects</InputLabel>
              <Select
                labelId="projects"
                label="Projects"
                defaultValue={currentProjectDetails._id}
                error={!!errorMessages._id}
                onChange={(e) => handleInputChange("_id", e.target.value)}
              >
                {projectList.map((project) => (
                  <MenuItem key={project._id} value={project._id}>
                    {truncateSummary(project.name)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: 290 }}>
              <InputLabel id="IssueType">Issue Types</InputLabel>
              <Select
                labelId="IssueType"
                label="Issue Type"
                value={formDetails.issueType}
                error={!!errorMessages.issueType}
                onChange={(e) => handleInputChange("issueType", e.target.value)}
              >
                <MenuItem value="Task">Task</MenuItem>
                <MenuItem value="Bugs">Bugs</MenuItem>
                <MenuItem value="Problem">Problem</MenuItem>
                <MenuItem value="Change">Change</MenuItem>
              </Select>
            </FormControl>
            {!!errorMessages.issueType && (
              <Typography variant="body2" color="error">
                {errorMessages.issueType}
              </Typography>
            )}
          </Grid>
          <Grid item>
            <FormControl sx={{ minWidth: 290 }}>
              <InputLabel id="Status">Status</InputLabel>
              <Select
                labelId="Status"
                label="Status"
                value={formDetails.status}
                error={!!errorMessages.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="InProgress">In progress</MenuItem>
                <MenuItem value="InReview">In review</MenuItem>
                <MenuItem value="Done">Done</MenuItem>
              </Select>
            </FormControl>
            {!!errorMessages.status && (
              <Typography variant="body2" color="error">
                {errorMessages.status}
              </Typography>
            )}
          </Grid>
          <Divider />
          <Grid item>
            <TextField
              id="summary"
              label="Summary"
              sx={{ width: 450 }}
              value={formDetails.summary}
              error={!!errorMessages.summary}
              onChange={(e) => handleInputChange("summary", e.target.value)}
            />
            {!!errorMessages.summary && (
              <Typography variant="body2" color="error">
                {errorMessages.summary}
              </Typography>
            )}
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Due date"
                value={
                  !isEmpty(formDetails.dueDate)
                    ? dayjs(formDetails.dueDate)
                    : null
                }
                minDate={dayjs()}
                slotProps={{
                  error: true,
                  textField: {
                    color: !!errorMessages.dueDate ? "warning" : "success",
                    focused: !!errorMessages.dueDate,
                  },
                }}
                error={!!formDetails.dueDate}
                onChange={(data) =>
                  handleInputChange("dueDate", new Date(data).toISOString())
                }
              />
            </LocalizationProvider>
            {!!errorMessages.dueDate && (
              <Typography variant="body2" color="error">
                {errorMessages.dueDate}
              </Typography>
            )}
          </Grid>
          <Grid item>
            <InputLabel>Description</InputLabel>
            <TextField
              sx={{ width: 600, maxHeight: 300, overflowY: "scroll" }}
              multiline
              value={formDetails.description}
              error={!!errorMessages.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
            {!!errorMessages.description && (
              <Typography variant="body2" color="error">
                {errorMessages.description}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          direction="row-reverse"
          sx={{ mt: 3 }}
          columnSpacing={2}
        >
          <Grid item>
            <Button size="large" onClick={() => handleFormSubmission(false)}>
              Next Issue
            </Button>
          </Grid>
          <Grid item>
            <Button size="large" onClick={() => handleFormSubmission(true)}>
              Done
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
