import { Navigate, Outlet } from "react-router-dom";
import authUtil from "../../../utils/auth.util";

export default function () {
  const isAuth = authUtil.isUserLoggedIn();
  return !isAuth ? <Outlet /> : <Navigate to="/" />;
}
