import Home from "../components/pages/home/home.page";
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
    ],
  },
];
