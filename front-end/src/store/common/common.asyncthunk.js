/* eslint-disable import/no-anonymous-default-export */
const auth = require("../../services/auth");
import tokenUtil from "../../utils/token.util";

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
];