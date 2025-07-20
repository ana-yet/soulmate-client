import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import AuthLayout from "../Layouts/AuthLayout";
import DashboardLayout from "../Layouts/DashboardLayout";

import PrivateRoute from "../Routes/PrivateRoute";

import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import EditBiodata from "../Pages/Dashboard/EditBioata/EditBioData";
import Forbidden from "../Pages/Forbidden/Forbidden";
import ViewBiodata from "../Pages/Dashboard/ViewBiodata/ViewBiodata";
import BiodataDetailsPage from "../Pages/BiodataDetails/BiodataDetails";
import MyFavouritesList from "../Pages/Dashboard/MyFavouritesList/MyFavouritesList";
import BiodatasPage from "../Pages/BiodatasPage/Biodatas";
import CheckoutPage from "../Pages/CheckoutPage/CheckoutPage";
import MyContactRequests from "../Pages/Dashboard/MyContactRequests/MyContactRequests";
import GotMarriedForm from "../Pages/Dashboard/GotMarried/GotMarriedForm";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ApprovedPremium from "../Pages/Dashboard/Admin/ApprovedPremium/ApprovedPremium";
import ApprovedContactRequests from "../Pages/Dashboard/Admin/ApprovedContactRequests/ApprovedContactRequests";
import SuccessStoryApproval from "../Pages/Dashboard/Admin/SuccessStoryApproval/SuccessStoryApproval";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "biodatas",
        element: <BiodatasPage />,
      },
      {
        path: "biodata/:id",
        element: (
          <PrivateRoute>
            <BiodataDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "forbidden",
        element: <Forbidden />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <h1>this is dashboard main route</h1>,
      },
      {
        path: "edit-biodata",
        element: <EditBiodata />,
      },
      {
        path: "view-biodata",
        element: <ViewBiodata />,
      },
      {
        path: "favourites",
        element: <MyFavouritesList />,
      },
      {
        path: "contact-requests",
        element: <MyContactRequests />,
      },
      { path: "got-married", element: <GotMarriedForm /> },
      // admin routes
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "approve-premium",
        element: <ApprovedPremium />,
      },
      {
        path: "approve-contacts",
        element: <ApprovedContactRequests />,
      },
      {
        path: "approve-married",
        element: <SuccessStoryApproval />,
      },
    ],
  },
  {
    path: "checkout/:id",
    element: (
      <PrivateRoute>
        <CheckoutPage />
      </PrivateRoute>
    ),
  },
]);

export default router;
