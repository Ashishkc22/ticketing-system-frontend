const projects = require("../../services/projects");
const issue = require("../../services/issue");
import { enqueueSnackbar } from "notistack";
export default [
  {
    name: "projects/getProjects",
    thunk: projects.default.getProjects,
    cases: {
      pending: (state, action) => {
        console.log("isProjectsLoading", true);
        state.projectDetails = {
          ...state.projectDetails,
          isProjectsLoading: true,
        };
      },
      rejected: (state, action) => {
        console.log("isProjectsLoading", false);
        state.projectDetails = {
          ...state.projectDetails,
          isProjectsLoading: false,
        };
      },
      fulfilled: (state, action) => {
        console.log("full", action);
        console.log("isProjectsLoading", false);
        console.log("state fulfilled >>>>>>>", state.projectDetails);

        state.projectDetails = {
          ...state.projectDetails,
          projects: action?.payload?.data,
          isProjectsLoading: false,
        };
      },
    },
  },
  {
    name: "projects/addEditProject",
    thunk: projects.default.addEditProjects,
    cases: {
      rejected: (state, action) => {
        state.isProjectSubmitted = true;
      },
      fulfilled: (state, action) => {
        state.isProjectSubmitted = true;
      },
    },
  },
  {
    name: "projects/deleteProjectByID",
    thunk: projects.default.deleteProjectById,
    cases: {
      rejected: (state, action) => {
        enqueueSnackbar("Failed to delete project.", {
          variant: "error",
          autoHideDuration: 2000,
        });
      },
      fulfilled: (state, action) => {
        enqueueSnackbar("Project deleted successfully.", {
          variant: "success",
          autoHideDuration: 2000,
        });
      },
    },
  },
  {
    name: "projects/getProjectById",
    thunk: projects.default.getProjectById,
    cases: {
      rejected: (state, action) => {
        enqueueSnackbar("Failed to get project details.", {
          variant: "error",
          autoHideDuration: 2000,
        });
      },
      fulfilled: (state, action) => {
        state.projectDetails.selected = action?.payload?.data;
      },
    },
  },
  {
    name: "projects/addEditIssue",
    thunk: issue.default.addEditIssue,
    cases: {
      rejected: (state, action) => {
        enqueueSnackbar("Failed to create/edit issue details.", {
          variant: "error",
          autoHideDuration: 2000,
        });
        throw new Error("Failed to create/edit issue details.");
      },
      fulfilled: (state, action) => {
        enqueueSnackbar("Issue created/edited successfully.", {
          variant: "success",
          autoHideDuration: 2000,
        });
      },
    },
  },
  {
    name: "projects/getIssueList",
    thunk: issue.default.getIssueList,
    cases: {
      rejected: (state, action) => {
        throw new Error("Failed to create/edit issue details.");
      },
      fulfilled: (state, action) => {
        state.issueList.data = action?.payload?.data?.data;
        state.issueList.count = action?.payload?.data?.count;
      },
    },
  },
];
