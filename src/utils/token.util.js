import cookieUtil from "./cookies.util";

function getAuthToken() {
  console.log("cookieUtil", cookieUtil);
  let cookie = cookieUtil.getCookie({});
  cookie = JSON.parse(cookie);
  return cookie?.token || false;
}

function getTokenDetails(token) {
  const [header, payload, signature] = token.split(".");
  const decodedPayload = JSON.parse(atob(payload));
  return decodedPayload;
}

export default {
  getAuthToken,
  getTokenDetails,
};
