import axios from "axios";
import envUtil from "./env.util";
import { isEmpty } from "lodash";

// const PARAMS = ["get", "put", "delete"];
// const BODY = ["post"];

const { protocol, getApiUrl, getPort } = envUtil;

function request({ path, method, params, body, options }) {
  return axios({
    method,
    url: `${protocol()}://${getApiUrl()}:${getPort()}/${path}`,
    headers: {
      "Content-Type": "application/json",
    },
    ...(params && { params }),
    ...(!isEmpty(body) && { data: body }),
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
function post({ path, body, options }) {
  return request({ method: "post", path, body, options });
}

export default {
  get,
  post,
};
