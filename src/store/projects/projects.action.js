export default {
  setProject: (state, data) => {
    state.projectDetails = { ...state.projectDetails, selected: data?.payload || data };
  },
  resetIssueStatusApiTrackStatus: (state) => {
    state.boardStatusChangeInProgress.value = false
    state.boardStatusChangeInProgress.isFailed = false
  }
};
