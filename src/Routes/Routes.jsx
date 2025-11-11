import { createBrowserRouter } from "react-router";
import HomeLayOut from "../Layouts/HomeLayOut";
import App from "../App";
import ErrorPage from "../Pages/ErrorPage";
import AllCropsPage from "../Pages/AllCropsPage";
import AuthLayout from "../Layouts/AuthLayOut";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import MyProfile from "../Pages/MyProfile";
import CropsDetails from "../Components/CropsDetails";
import NewsDetails from "../Pages/NewsDetails";

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
      },
      {
        path: 'my-profile',
        element: <MyProfile/>
      },
      {
        path: 'crops-details/:id/:type',
        element: <CropsDetails/>
      },
      {
        path: "/news/:id", 
        element: <NewsDetails />
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