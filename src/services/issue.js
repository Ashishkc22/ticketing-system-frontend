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

export default { addEditIssue, getIssueList };
