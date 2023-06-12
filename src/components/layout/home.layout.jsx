import { useLocation, Outlet } from "react-router-dom";
import AppBar from "../common/AppBar/appBar";
export function Home() {
  const location = useLocation();
  const Links = [
    {
      text: "Projects",
      type: "drop-down",
      path: "/projects",
    },
    {
      text: "Tickets",
      type: "Links",
      path: "/tickets",
    },
  ];
  return (
    <>
      <AppBar Links={Links} />
      <Outlet />
    </>
  );
}
