import cookies from "./cookies.util";
import env from "./env.util";

function isUserLoggedIn() {
  let cookie = cookies.getCookie({});
  cookie = JSON.parse(cookie);
  return cookie?.token || "";
}

function clearCookies() {
  try {
    cookies.eraseCookie();
  } catch (error) {
    console.log("error eraseCookie", error);
  }
}

export default {
  isUserLoggedIn,
  clearCookies,
};
