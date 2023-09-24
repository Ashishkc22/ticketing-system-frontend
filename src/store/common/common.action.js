export default {
  toggleDrawer: (state) => {
    state.isDrawerOpen = !state.isDrawerOpen;
  },
  toggleIsUserLoggedIn: (state) => {
    console.log("triggered user logged in sate change");
    state.isUserLoggedIn = !state.isUserLoggedIn;
  },
  setProject: (state, data) => {
    state.projectDetails = { ...state.projectDetails, selected: data };
  },
  setLoggedInUserDetails: (state) => {
    state.isUserLoggedIn = !state.isUserLoggedIn;
  },
};
