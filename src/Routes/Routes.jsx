import { createBrowserRouter } from "react-router";
import HomeLayOut from "../Layouts/HomeLayOut";
import App from "../App";
import ErrorPage from "../Pages/ErrorPage";
import AllCropsPage from "../Pages/AllCropsPage";
import AuthLayout from "../Layouts/AuthLayOut";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import CropsDetails from "../Components/CropsDetails";
import NewsDetails from "../Pages/NewsDetails";
import About from "../Pages/About";

import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

// Dashboard
import DashboardLayout from "../Layouts/DashboardLayout";
import MyProfile from "../Pages/MyProfile";
import BuyerDashboard from "../Dashboard/buyer/BuyerDashboard";
import BuyerInterests from "../Dashboard/buyer/BuyerInterests";
import FarmerDashboard from "../Dashboard/farmer/FarmerDashboard";
import FarmerCrops from "../Dashboard/farmer/FarmerCrops";
import FarmerAddCrop from "../Dashboard/farmer/FarmerAddCrop";
import FarmerInterests from "@/Dashboard/farmer/FarmerInterests";
import DashboardHome from "../Dashboard/DashboardHome";
import AdminOverview from "../Dashboard/admin/AdminOverview";
import AdminUsers from "../Dashboard/admin/AdminUsers";
import AdminRequests from "../Dashboard/admin/AdminRequests";
import AdminCrops from "../Dashboard/admin/AdminCrops";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayOut />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <App /> },
      { path: "/all-crops", element: <AllCropsPage /> },
      { path: "/about", element: <About /> },
      { path: "/news/:id", element: <NewsDetails /> },
      { path: "crops-details/:id/:type", element: <CropsDetails /> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },

      { path: "profile", element: <MyProfile /> },

      // Buyer routes...

      {
        path: "buyer",
        element: (
          <RoleRoute allowed={["buyer"]}>
            <BuyerDashboard />
          </RoleRoute>
        ),
      },
      {
        path: "buyer/interests",
        element: (
          <RoleRoute allowed={["buyer"]}>
            <BuyerInterests />
          </RoleRoute>
        ),
      },

      // Farmer routes...

      {
        path: "farmer",
        element: (
          <RoleRoute allowed={["farmer"]}>
            <FarmerDashboard />
          </RoleRoute>
        ),
      },
      {
        path: "farmer/crops",
        element: (
          <RoleRoute allowed={["farmer"]}>
            <FarmerCrops />
          </RoleRoute>
        ),
      },
      {
        path: "farmer/crops/add",
        element: (
          <RoleRoute allowed={["farmer"]}>
            <FarmerAddCrop />
          </RoleRoute>
        ),
      },
      {
        path: "farmer/interests",
        element: (
          <RoleRoute allowed={["farmer"]}>
            <FarmerInterests />
          </RoleRoute>
        ),
      },

      // Admin routes...

      {
        path: "admin",
        element: (
          <RoleRoute allowed={["admin"]}>
            <AdminOverview />
          </RoleRoute>
        ),
      },
      {
        path: "admin/users",
        element: (
          <RoleRoute allowed={["admin"]}>
            <AdminUsers />
          </RoleRoute>
        ),
      },
      {
        path: "admin/requests",
        element: (
          <RoleRoute allowed={["admin"]}>
            <AdminRequests />
          </RoleRoute>
        ),
      },
      {
        path: "admin/crops",
        element: (
          <RoleRoute allowed={["admin"]}>
            <AdminCrops />
          </RoleRoute>
        ),
      },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/register", element: <Register /> },
    ],
  },
]);

export default router;
