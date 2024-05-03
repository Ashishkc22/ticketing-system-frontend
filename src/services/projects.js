import axiosUtil from "../utils/api.util";
async function getProjects() {
  const { data, error } = await axiosUtil.get({
    path: "api/v1/projects/get-projects",
    // body: _payload,
  });
  if (error) {
    console.log("error", error);
    throw error;
  } else {
    console.log("projects response", data);
    return data;
  }
}

async function addEditProjects(payload) {
  const { data, error } = await axiosUtil.post({
    path: "api/v1/projects/add-edit-project",
    body: payload,
  });
  if (error) {
    console.log("error", error);
    throw error;
  } else {
    console.log("projects response", data);
    return data;
  }
}

async function deleteProjectById(payload) {
  const { data, error } = await axiosUtil.delete({
    path: "api/v1/projects/delete-project-by-id",
    body: payload,
  });
  if (error) {
    console.log("error", error);
    throw error;
  } else {
    console.log("projects response", data);
    return data;
  }
}

async function getProjectById(payload) {
  const { data, error } = await axiosUtil.get({
    path: "api/v1/projects/get-project-by-id",
    params: payload,
  });
  if (error) {
    throw error;
  } else {
    return data;
  }
}

export default {
  getProjects,
  addEditProjects,
  deleteProjectById,
  getProjectById,
};
