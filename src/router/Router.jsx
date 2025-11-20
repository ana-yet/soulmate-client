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
import AdminRoute from "../Routes/AdminRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import AboutUsPage from "../Pages/AboutUsPage/AboutUsPage";
import ContactUsPage from "../Pages/ContactUsPage/ContactUsPage";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import SuccessStoriesDetails from "../Pages/Home/SuccessStoriesSection/SuccessStoriesDetails/SuccessStoriesDetails";

// New Feature Components
import MessageCenter from "../Pages/Dashboard/MessageCenter/MessageCenter";
import NotificationCenter from "../Pages/Dashboard/NotificationCenter/NotificationCenter";
import ProfileVerification from "../Pages/Dashboard/ProfileVerification/ProfileVerification";
import BlogPage from "../Pages/BlogPage/BlogPage";
import BlogPost from "../Pages/BlogPage/BlogPost";
import AdminBlogManager from "../Pages/Dashboard/Admin/AdminBlogManager";
import AdminVerification from "../Pages/Dashboard/Admin/AdminVerification";

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
        element: <BiodataDetailsPage />,
      },
      {
        path: "about-us",
        element: <AboutUsPage />,
      },
      {
        path: "contact-us",
        element: <ContactUsPage />,
      },
      {
        path: "success-stories/:id",
        element: <SuccessStoriesDetails />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "blog/:slug",
        element: <BlogPost />,
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
        element: <Dashboard />,
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
      {
        path: "profile",
        element: <MyProfile />,
      },
      {
        path: "messages",
        element: <MessageCenter />,
      },
      {
        path: "notifications",
        element: <NotificationCenter />,
      },
      {
        path: "verification",
        element: <ProfileVerification />,
      },
      // admin routes
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />,
          </AdminRoute>
        ),
      },
      {
        path: "approve-premium",
        element: (
          <AdminRoute>
            <ApprovedPremium />
          </AdminRoute>
        ),
      },
      {
        path: "approve-contacts",
        element: (
          <AdminRoute>
            <ApprovedContactRequests />
          </AdminRoute>
        ),
      },
      {
        path: "approve-married",
        element: (
          <AdminRoute>
            <SuccessStoryApproval />
          </AdminRoute>
        ),
      },
      {
        path: "blog-manager",
        element: (
          <AdminRoute>
            <AdminBlogManager />
          </AdminRoute>
        ),
      },
      {
        path: "verify-profiles",
        element: (
          <AdminRoute>
            <AdminVerification />
          </AdminRoute>
        ),
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
  {
    path: "forbidden",
    element: <Forbidden />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
