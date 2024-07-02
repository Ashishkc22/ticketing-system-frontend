import axiosUtil from "../utils/api.util";
async function addEditIssue(payload) {
  const { data, error } = await axiosUtil.post({
    path: "api/v1/projects/add-edit-issue",
    body: payload,
  });
  if (error) {
    throw error;
  } else {
    return data;
  }
}

async function getIssueList(payload) {
  const { data, error } = await axiosUtil.get({
    path: "api/v1/projects/get-issue-list",
    params: payload,
  });
  if (error) {
    throw error;
  } else {
    return data;
  }
}

async function getIssueByDateRange(payload) {
  const { data, error } = await axiosUtil.get({
    path: "api/v1/projects/get-issue-by-date-range",
    params: payload,
  });
  if (error) {
    throw error;
  } else {
    return data;
  }
}

async function changeIssueStatus(payload) {
  const { data, error } = await axiosUtil.post({
    path: "api/v1/projects/change-issue-status",
    body: payload,
  });
  if (error) {
    throw error;
  } else {
    return data;
  }
}

async function getIssueDetailsById(payload){
  const { data, error } = await axiosUtil.get({
    path: "api/v1/projects/get-issue-by-id",
    params: payload,
  })
  if (error) {
    throw error;
  } else {
    return data;
  }
}
async function removeIssueById(payload){
  const { data,error } = await axiosUtil.get({
    path: "api/v1/projects/delete-issue-by-id",
    params: payload
  })
  if(error){
    throw error
  }else {
    return data
  }
}
export default {
  addEditIssue,
  getIssueList,
  getIssueByDateRange,
  changeIssueStatus,
  getIssueDetailsById,
  removeIssueById
};
