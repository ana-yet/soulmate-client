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
    ],
  },
]);

export default router;
