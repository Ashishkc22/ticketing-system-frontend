import cookieUtil from "./cookies.util";

function getAuthToken() {
  console.log("cookieUtil", cookieUtil);
  let cookie = cookieUtil.getCookie({});
  cookie = JSON.parse(cookie);
  return cookie?.token || false;
}

export default {
  getAuthToken,
};
