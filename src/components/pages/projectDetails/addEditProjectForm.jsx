import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Typography from "@mui/material/Typography";
import { isEmpty } from "lodash";
import { thunks } from "../../../store/projects";
import { enqueueSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import { useSearchParams, useParams } from "react-router-dom";

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
  console.log("projectId ====>", projectId);
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
    // if (!isLoading) {
    // Handle form submission, you can perform validation or submit the data as needed
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
        // setTimeout(closeDialog, 2000);
      }
      nav("/");
      // Reset form fields after submission if needed
    } catch (error) {
      console.log("error >>>> got it");
    }
    // }
  };
  useEffect(() => {
    const _projectId = searchParams.get("id");
    if (!isEmpty(projectsDetails) && _projectId) {
      console.log("got Data", projectsDetails);
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
    <Box width={500}>
      <Typography gutterBottom variant="h5" component="div">
        Project Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          disabled={projectId}
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          helperText={formErrors?.name}
          error={!isEmpty(formErrors?.name)}
        />
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
        />
        <TextField
          label="Short Description"
          variant="outlined"
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          helperText={formErrors?.description}
          error={!isEmpty(formErrors?.description)}
        />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                disabled={projectId}
                value={
                  !isEmpty(formData?.startDate) || projectId
                    ? dayjs(formData?.startDate)
                    : null
                }
                name="startDate"
                onChange={(data) => {
                  setFormData({
                    ...formData,
                    startDate: new Date(data).toISOString(),
                  });
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="End Date"
                value={
                  !isEmpty(formData?.endDate) || projectId
                    ? dayjs(formData?.endDate)
                    : null
                }
                name="endDate"
                onChange={(data) => {
                  setFormData({
                    ...formData,
                    endDate: new Date(data).toISOString(),
                  });
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <br />

        {projectId ? (
          <Button
            sx={{ my: 1 }}
            type="submit"
            variant="outlined"
            color="primary"
          >
            Submit
          </Button>
        ) : (
          <Button
            sx={{ my: 1 }}
            type="submit"
            variant="outlined"
            color="primary"
            disabled={
              isEmpty(formData?.description) ||
              isEmpty(formData?.name) ||
              isEmpty(formData?.shortDescription) ||
              isEmpty(formData?.startDate) ||
              isEmpty(formData?.endDate)
            }
          >
            Submit
          </Button>
        )}
      </form>
    </Box>
  );
}
