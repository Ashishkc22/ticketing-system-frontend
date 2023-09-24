/* eslint-disable import/no-anonymous-default-export */
const auth = require("../../services/auth");
const tokenUtil = require("../../utils/token.util");
const common = require("../../services/common");

export default [
  {
    name: "auth/login",
    thunk: auth.default.login,
    cases: {
      pending: (state, action) => {
        state.isUserLoggedIn = !state.isUserLoggedIn;
      },
      rejected: (state, action) => {
        console.log("error=======>", action.error);
      },
      fulfilled: (state, action) => {
        const token = action.payload.data.token;
        if (token) {
          const details = tokenUtil.getTokenDetails(token);
          state.userDetails = details;
          console.log("action fulfilled", details);
        }
      },
    },
  },
  {
    name: "auth/getMenu",
    thunk: auth.default.login,
    cases: {
      pending: (state, action) => {
        state.isUserLoggedIn = !state.isUserLoggedIn;
      },
      rejected: (state, action) => {
        console.log("error=======>", action.error);
      },
      fulfilled: (state, action) => {
        console.log("action fulfilled", action);
      },
    },
  },
  {
    name: "projects/getProjects",
    thunk: common.default.getProjects,
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
];
