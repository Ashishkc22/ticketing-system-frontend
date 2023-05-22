import axios from "axios";
import envUtil from "./env.util";

// const PARAMS = ["get", "put", "delete"];
// const BODY = ["post"];

const { protocol, getApiUrl, getPort } = envUtil;

function request({ path, method, params, body, options }) {
  return axios({
    method,
    url: `${protocol()}://${getApiUrl()}:${getPort()}/${path}`,
    headers: {},
    ...(params && { params }),
    ...(body && { data: body }),
  })
    .then((data) => {
      console.log("then,", data);
      return data;
    })
    .catch((err) => {
      console.error("err", err);
    });
}

function get({ path, params, options }) {
  return request({ method: "get", path, params, options });
}
function post({ path, params, options }) {
  return request({ method: "post", path, params, options });
}

export default {
  get,
  post,
};
