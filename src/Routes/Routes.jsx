import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import HomeLayOut from "../Layouts/HomeLayOut";
import App from "../App";
import ErrorPage from "../Pages/ErrorPage";
const AllCropsPage = lazy(() => import("../Pages/AllCropsPage"));
const About = lazy(() => import("@/Pages/About"));
const FAQ = lazy(() => import("../Pages/FAQ"));
const CommunityGuidelines = lazy(() =>
  import("../Pages/CommunityGuidelines")
);
const NewsDetails = lazy(() => import("../Pages/NewsDetails"));
const CropsDetails = lazy(() => import("../Components/CropsDetails"));

const AuthLayout = lazy(() => import("../Layouts/AuthLayOut"));
const Login = lazy(() => import("../Pages/Login"));
const Register = lazy(() => import("../Pages/Register"));

import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

// Dashboard
const DashboardLayout = lazy(() => import("../Layouts/DashboardLayout"));
const DashboardHome = lazy(() => import("../Dashboard/DashboardHome"));
const MyProfile = lazy(() => import("../Pages/MyProfile"));

const BuyerDashboard = lazy(() => import("../Dashboard/buyer/BuyerDashboard"));
const BuyerInterests = lazy(() => import("../Dashboard/buyer/BuyerInterests"));
const BuyerPurchases = lazy(() => import("../Dashboard/buyer/BuyerPurchases"));
const BuyerTransactions = lazy(() =>
  import("../Dashboard/buyer/BuyerTransactions")
);
const FarmerDashboard = lazy(() =>
  import("../Dashboard/farmer/FarmerDashboard")
);
const FarmerCrops = lazy(() => import("../Dashboard/farmer/FarmerCrops"));
const FarmerAddCrop = lazy(() => import("../Dashboard/farmer/FarmerAddCrop"));
const FarmerInterests = lazy(() =>
  import("@/Dashboard/farmer/FarmerInterests")
);
const AdminOverview = lazy(() => import("../Dashboard/admin/AdminOverview"));
const AdminUsers = lazy(() => import("../Dashboard/admin/AdminUsers"));
const AdminRequests = lazy(() => import("../Dashboard/admin/AdminRequests"));
const AdminCrops = lazy(() => import("../Dashboard/admin/AdminCrops"));

// Payment Pages
const PaymentSuccess = lazy(() => import("../Pages/Payment/PaymentSuccess"));
const PaymentFailed = lazy(() => import("../Pages/Payment/PaymentFailed"));
const PaymentCancelled = lazy(() =>
  import("../Pages/Payment/PaymentCancelled")
);
const PaymentError = lazy(() => import("../Pages/Payment/PaymentError"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayOut />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <App /> },
      { path: "/all-crops", element: <AllCropsPage /> },
      { path: "/about", element: <About /> },
      { path: "/faq", element: <FAQ /> },
      { path: "/guidelines", element: <CommunityGuidelines /> },
      { path: "/news/:id", element: <NewsDetails /> },
      { path: "crops-details/:id/:type", element: <CropsDetails /> },
    ],
  },

  // Payment result pages (outside dashboard, full page)
  {
    path: "/payment/success",
    element: <PaymentSuccess />,
  },
  {
    path: "/payment/failed",
    element: <PaymentFailed />,
  },
  {
    path: "/payment/cancelled",
    element: <PaymentCancelled />,
  },
  {
    path: "/payment/error",
    element: <PaymentError />,
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
      {
        path: "buyer/purchases",
        element: (
          <RoleRoute allowed={["buyer"]}>
            <BuyerPurchases />
          </RoleRoute>
        ),
      },
      {
        path: "buyer/transactions",
        element: (
          <RoleRoute allowed={["buyer"]}>
            <BuyerTransactions />
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
