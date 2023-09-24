import axiosUtil from "../utils/api.util";
import cookiesUtil from "../utils/cookies.util";

async function login(payload) {
  const _payload = {
    email: payload.email,
    password: payload.password,
  };

  const { data, error } = await axiosUtil.post({
    path: "api/v1/auth/login",
    body: _payload,
  });
  if (error) {
    console.log("error", error);
    throw error;
  } else {
    console.log("response", data);
    cookiesUtil.setCookie({ value: { token: data.data.token }, days: 1 });
  }
  return data;
}

async function registration(payload) {
  const _payload = {
    phone: payload.phone,
    email: payload.email,
    password: payload.password,
  };
  const data = await axiosUtil.post({
    path: "api/v1/auth/registration",
    body: _payload,
  });

  console.log("response", data);
}

export default {
  login,
  registration,
};
