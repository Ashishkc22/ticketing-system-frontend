export default {
  toggleDrawer: (state) => {
    state.isDrawerOpen = !state.isDrawerOpen;
  },
  toggleIsUserLoggedIn: (state) => {
    console.log("triggered user logged in sate change");
    state.isUserLoggedIn = !state.isUserLoggedIn;
  },
  setLoggedInUserDetails: (state, details) => {
    state.userDetails = details.payload;
  },
  setSelectedMenuPath: (state, data) => {
    state.selectedMenuPath = data.payload;
  },
};
