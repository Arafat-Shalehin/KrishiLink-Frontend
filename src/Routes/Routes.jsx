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
import AddCrops from "../Pages/AddCrops";
import MyPostPage from "../Pages/MyPostPage";
import MyInterest from "../Pages/MyInterest";
import ReceivedInterests from "../Components/ReceivedInterests";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayOut />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/all-crops",
        element: <AllCropsPage />,
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "crops-details/:id/:type",
        element: (
          <PrivateRoute>
            <CropsDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/news/:id",
        element: <NewsDetails />,
      },
      {
        path: "/add-crops",
        element: (
          <PrivateRoute>
            <AddCrops />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-posts",
        element: (
          <PrivateRoute>
            <MyPostPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-interest",
        element: (
          <PrivateRoute>
            <MyInterest />
          </PrivateRoute>
        ),
      },
      {
        path: "/receiveInterest",
        element: <ReceivedInterests />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
