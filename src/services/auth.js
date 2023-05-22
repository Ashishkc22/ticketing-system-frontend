import axiosUtil from "../utils/api.util";

async function login() {
  const data = await axiosUtil.get({ path: "api/v1/test" });
  console.log("response", data);
}

export default {
  login,
};
