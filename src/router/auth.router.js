import Login from "../components/pages/login/login.page";
import UserRegistration from "../components/pages/userRegistration/signup";

export default [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "registration",
    element: <UserRegistration />,
  },
];
