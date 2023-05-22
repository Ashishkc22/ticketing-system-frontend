import { createBrowserRouter } from "react-router-dom";
import { Blank } from "../components/layout/blank.layout";
import auth from "./auth.router";

export default createBrowserRouter([
  {
    path: "/",
    element: <Blank />,
    children: [...auth],
  },
]);
