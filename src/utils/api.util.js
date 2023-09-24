import axios from "axios";
import envUtil from "./env.util";
import { isEmpty } from "lodash";
import tokenUtil from "./token.util";

// const PARAMS = ["get", "put", "delete"];
// const BODY = ["post"];

const { getApiUrl } = envUtil;

function request({ path, method, params, body, options }) {
  console.log("tokenUtil", tokenUtil);
  const token = tokenUtil.getAuthToken();
  return axios({
    method,
    url: getApiUrl({ path }),
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: token }),
    },
    ...(params && { params }),
    ...(!isEmpty(body) && { data: body }),
  })
    .then((data) => {
      console.log("then,", data);
      return { data: data.data };
    })
    .catch((error) => {
      console.error("err", error);
      return { error: error.message };
    });
}

function get({ path, params, options }) {
  return request({ method: "get", path, params, options });
}
function post({ path, body, options }) {
  return request({ method: "post", path, body, options });
}

export default {
  get,
  post,
};
