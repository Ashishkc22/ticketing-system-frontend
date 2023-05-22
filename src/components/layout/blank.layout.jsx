import { useLocation, Outlet } from "react-router-dom";

export function Blank() {
  const location = useLocation();
  return <Outlet />;
}
