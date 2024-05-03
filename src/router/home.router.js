import Home from "../components/pages/home/home.page";
import AddProject from "../components/pages/projectDetails/addEditProjectForm";
import ProtectedRoute from "../components/common/routeElements/protected.route";
export default [
  {
    path: "",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        label: "home",
        element: <Home />,
      },
      {
        path: "add-edit-project",
        label: "addProjectForm",
        element: <AddProject />,
      },
    ],
  },
];
