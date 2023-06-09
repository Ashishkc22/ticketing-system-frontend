import { useLocation, Outlet } from "react-router-dom";
import AppBar from "../common/AppBar/appBar";
export function Home() {
  const location = useLocation();
  const Links = [
    {
      text: "Projects",
      path: "/projects",
    },
    {
      text: "Tickets",
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
