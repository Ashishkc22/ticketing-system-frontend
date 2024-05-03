/* eslint-disable import/no-anonymous-default-export */
import axiosUtil from "../utils/api.util";
import cookiesUtil from "../utils/cookies.util";

async function getMenu() {
  const { data, error } = await axiosUtil.post({
    path: "api/v1/common/getMenu",
    body: _payload,
  });
  if (error) {
    console.log("error", error);
    throw error;
  } else {
    console.log("response", data);
    cookiesUtil.setCookie({ value: data.data.token, days: 1 });
  }
  return data;
}

export default {
  getMenu,
};
