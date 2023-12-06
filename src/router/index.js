import { createBrowserRouter } from "react-router-dom";
import { Home as HomeLayout } from "../components/layout/home.layout";
import { Blank } from "../components/layout/blank.layout";
import auth from "./auth.router";
import home from "./home.router";
import issues from "./issues.router";
import NotFoundPage from "../components/common/ErrorComponents/NotFoundPage";

export default createBrowserRouter([
  {
    path: "/auth",
    element: <Blank />,
    children: [...auth],
    errorElement: <NotFoundPage />,
  },
  {
    path: "/",
    element: <HomeLayout />,
    children: [...home, ...issues],
    errorElement: <NotFoundPage />,
  },
]);
