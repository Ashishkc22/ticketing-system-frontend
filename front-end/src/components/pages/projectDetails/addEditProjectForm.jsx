import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { isEmpty } from "lodash";
import { thunks } from "../../../store/projects";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    shortDescription: "",
    startDate: "",
    endDate: "",
  });

  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("id");
  const nav = useNavigate();
  const projectsDetails = useSelector(
    (state) => state?.projects?.projectDetails?.selected
  );

  const [formErrors, setFormErros] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (isEmpty(e.target.value)) {
      setFormErros({
        ...formErrors,
        [e.target.name]: "This field is required",
      });
    } else {
      setFormErros({
        ...formErrors,
        [e.target.name]: "",
      });
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        thunks["projects/addEditProject"]({
          ...formData,
          ...(projectId && { id: projectId }),
        })
      );
      if (result?.error?.message) {
        enqueueSnackbar(result?.error?.message || "Something went wrong", {
          variant: "error",
          autoHideDuration: 1000,
        });
      } else {
        enqueueSnackbar("Done", {
          variant: "success",
          autoHideDuration: 1000,
        });
      }
      nav("/");
    } catch (error) {
      console.log("error >>>> got it");
    }
  };

  useEffect(() => {
    const _projectId = searchParams.get("id");
    if (!isEmpty(projectsDetails) && _projectId) {
      setFormData({
        ...formData,
        name: projectsDetails.name,
        description: projectsDetails.description,
        shortDescription: projectsDetails.shortDescription,
        startDate: new Date(projectsDetails.startDate),
        endDate: new Date(projectsDetails.endDate),
      });
    }
  }, [projectsDetails]);

  useEffect(() => {
    if (projectId) {
      dispatch(thunks["projects/getProjectById"]({ id: projectId }));
    }
  }, []);

  return (
    <div
      style={{
        // maxWidth: 600,
        // mx: "auto",
        mt: 5,
        p: 4,
        // borderRadius: 3,
        // boxShadow:2,
        // backgroundColor: "#f0f4f7",
      }}
    >
      {/* // <Paper
    //   elevation={10}
    //   sx={{
    //     maxWidth: 600,
    //     mx: "auto",
    //     mt: 5,
    //     p: 4,
    //     borderRadius: 3,
    //     boxShadow:2,
    //     backgroundColor: "#f0f4f7",
    //   }}
    // > */}
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        // align="center"
        color="primary"
        sx={{ mb: 2 }}
      >
        {projectId ? "Edit Project" : "Create Project"}
      </Typography>
      {/* <Divider sx={{ mb: 3 }} /> */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="left"
            alignContent="center"
          >
            <TextField
              disabled={projectId}
              label="Project Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              helperText={formErrors?.name}
              error={!isEmpty(formErrors?.name)}
              sx={{ maxWidth: "50%" }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="left"
            alignContent="center"
          >
            <TextField
              label="Description"
              variant="outlined"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              helperText={formErrors?.description}
              error={!isEmpty(formErrors?.description)}
              sx={{ maxWidth: "50%" }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="left"
            alignContent="center"
          >
            <TextField
              label="Short Description"
              variant="outlined"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={2}
              helperText={formErrors?.shortDescription}
              error={!isEmpty(formErrors?.shortDescription)}
              sx={{ maxWidth: "50%" }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="left"
            alignContent="center"
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                disabled={projectId}
                value={
                  !isEmpty(formData?.startDate) || projectId
                    ? dayjs(formData?.startDate)
                    : null
                }
                onChange={(date) => {
                  setFormData({
                    ...formData,
                    startDate: date ? date.toISOString() : "",
                  });
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="left"
            alignContent="center"
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="End Date"
                value={
                  !isEmpty(formData?.endDate) || projectId
                    ? dayjs(formData?.endDate)
                    : null
                }
                onChange={(date) => {
                  setFormData({
                    ...formData,
                    endDate: date ? date.toISOString() : "",
                  });
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
                sx={{ alignContent: "left" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item  xs={12} display="flex"
            justifyContent="left"
            alignContent="center">
          <Button
          sx={{ mt: 3,maxWidth:"30%" }}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={
            isEmpty(formData?.description) ||
            isEmpty(formData?.name) ||
            isEmpty(formData?.shortDescription) ||
            isEmpty(formData?.startDate) ||
            isEmpty(formData?.endDate)
          }
        >
          {projectId ? "Update Project" : "Create Project"}
        </Button>
          </Grid>
        </Grid>

      </form>
    </div>
    // </Paper>
  );
}
