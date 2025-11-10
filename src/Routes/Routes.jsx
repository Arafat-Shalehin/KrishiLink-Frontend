import { createBrowserRouter } from "react-router";
import HomeLayOut from "../Layouts/HomeLayOut";
import App from "../App";
import ErrorPage from "../Pages/ErrorPage";
import AllCropsPage from "../Pages/AllCropsPage";
import AuthLayout from "../Layouts/AuthLayOut";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayOut/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <App/>
      },
      {
        path: '/all-crops',
        element: <AllCropsPage/>
      }
    ]
  },
  {
        path: '/auth',
        element: <AuthLayout/>,
        children: [
            {
                path: '/auth/login',
                element: <Login/>
            },
            {
                path: '/auth/register',
                element: <Register/>
            }
        ]
    }
]);

export default router;