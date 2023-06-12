import axiosUtil from "../utils/api.util";

async function login(payload) {
  const _payload = {
    email: payload.email,
    password: payload.password,
  };
  const data = await axiosUtil.post({
    path: "api/v1/auth/login",
    body: _payload,
  });
  console.log("response", data);
}

export default {
  login,
};
