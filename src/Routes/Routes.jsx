import { createBrowserRouter } from "react-router";
import HomeLayOut from "../Layouts/HomeLayOut";
import App from "../App";
import ErrorPage from "../Pages/ErrorPage";
import AllCropsPage from "../Pages/AllCropsPage";

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
]);

export default router;