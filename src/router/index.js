import { createBrowserRouter } from "react-router-dom";
import { Home as HomeLayout } from "../components/layout/home.layout";
import { Project as ProjectLayout } from "../components/layout/project.layout";
import { Blank } from "../components/layout/blank.layout";
import auth from "./auth.router";
import home from "./home.router";
import issues from "./issues.router";
import NotFoundPage from "../components/common/ErrorComponents/NotFoundPage";
import ProjectDetails from "./project.router";

export default createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [...home],
    errorElement: <NotFoundPage />,
  },
  {
    path: "/auth",
    element: <Blank />,
    children: [...auth],
    errorElement: <NotFoundPage />,
  },
  {
    path: "/project",
    element: <ProjectLayout />,
    children: [...issues,...ProjectDetails],
    errorElement: <NotFoundPage />,
  },
]);
