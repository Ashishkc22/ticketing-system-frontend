export default {
  setProject: (state, data) => {
    state.projectDetails = { ...state.projectDetails, selected: data?.payload || data };
  },
};
