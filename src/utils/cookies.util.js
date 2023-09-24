import envUtil from "./env.util";

function setCookie({ name = envUtil.getApiUrl({}), value, days }) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  value = typeof value === "string" ? value : JSON.stringify(value);
  console.log("name", name);
  console.log("value", value);
  console.log("expires", expires);
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie({ name = envUtil.getApiUrl({}) }) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  console.log("ca", ca);
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}
function eraseCookie() {
  let name = envUtil.getApiUrl({});
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
export default {
  setCookie,
  getCookie,
  eraseCookie,
};