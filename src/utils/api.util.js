import axios from "axios";
import envUtil from "./env.util";
import { isEmpty } from "lodash";
import tokenUtil from "./token.util";
import storageUtil from "./storage.util"
import cookiesUtil from "./cookies.util"

// const PARAMS = ["get", "put", "delete"];
// const BODY = ["post"];

const { getApiUrl } = envUtil;

function request({ path, method, params, body, options }) {
  console.log("tokenUtil", tokenUtil);
  const token = tokenUtil.getAuthToken();
  console.log("token ==>>", token);
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
      console.error("err", error.response.data.error);
      if(error.response.data.error === "jwt expired"){
        console.log('storageUtil',storageUtil);
        storageUtil.eraseStroageData()
        cookiesUtil.clearAllCookies()
      }
      console.log('error', error);
      if(error.response?.data && error.response.status === 404){
        return { error: "Not Found" };
      }
      return { error: error.response.data.error };
    });
}

function get({ path, params, options }) {
  return request({ method: "get", path, params, options });
}
function post({ path, body, options }) {
  return request({ method: "post", path, body, options });
}

function _delete({ path, body, options }) {
  return request({ method: "delete", path, body, options });
}

export default {
  get,
  post,
  delete: _delete,
};
