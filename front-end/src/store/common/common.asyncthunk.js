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
  {
    name: "auth/forgotPassword",
    thunk: auth.default.forgotPassword,
    cases: {
      pending: (state, action) => {
        return "pending"
      },
      rejected: (state, action) => {
       return false
      },
      fulfilled: (state, action) => {
        console.log('action',action);
        if(action.payload.data.message != "successfull"){
          return action.payload.data.message
        }else{
          return "successfull"
        }
      },
    },
  },
  {
    name: "auth/resetPassword",
    thunk: auth.default.resetPassword,
    cases: {
      pending: (state, action) => {
        return "pending"
      },
      rejected: (state, action) => {
       return false
      },
      fulfilled: (state, action) => {
        console.log('reset password action',action);
        if(action.payload?.data?.message != "successfull" || action.payload.error){
          return action.payload?.data?.message || action.payload.error
        }else{
          return "successfull"
        }
      },
    },
  }
];
