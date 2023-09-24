import Login from "../components/pages/login/login.page";
import UserRegistration from "../components/pages/userRegistration/signup";
import ProtectedLogoutRequiredRoute from "../components/common/routeElements/protectedLogoutRequired.route";

export default [
  {
    path: "",
    element: <ProtectedLogoutRequiredRoute />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "registration",
        element: <UserRegistration />,
      },
    ],
  },
];
