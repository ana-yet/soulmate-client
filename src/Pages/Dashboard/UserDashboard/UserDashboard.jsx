import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  HiOutlinePencilAlt,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineStar,
  HiOutlineMailOpen,
  HiOutlineUsers,
} from "react-icons/hi";
import { MdVerified } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import DashboardCard from "./DashboardCard";
import { Helmet } from "react-helmet-async";

const useUserDashboardStats = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  return useQuery({
    queryKey: ["userDashboardStats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/user-dashboard-summary?email=${user?.email}`
      );
      return data;
    },
  });
};

// Main Dashboard Component
const UserDashboard = () => {
  const { data: stats, isLoading, isError, error } = useUserDashboardStats();

  const contactChartData = [
    { name: "Approved", value: stats?.contactStats?.approved || 0 },
    { name: "Pending", value: stats?.contactStats?.pending || 0 },
  ];
  const COLORS = ["#16A34A", "#FBBF24"];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-48 bg-white dark:bg-dark-secondary rounded-2xl shadow-lg animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-10 text-accent">Error: {error.message}</div>
    );
  }

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Dashboard | SoulMate</title>
        <meta
          name="description"
          content="Find your perfect match with our trusted biodata service."
        />
        <meta property="og:title" content="SoulMate - Your SoulMate" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* --- Quran Quote --- */}
      <div className="text-center bg-white dark:bg-dark-secondary p-6 rounded-2xl shadow-lg">
        <p className="font-secondary text-xl italic text-txt/80 dark:text-dark-text-muted">
          “And We created you in pairs.”
        </p>
        <p className="mt-2 text-sm font-semibold text-txt dark:text-dark-text">
          (Surah An-Naba 78:8)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* --- Biodata Summary Card --- */}
        <DashboardCard className="lg:col-span-1">
          <h3 className="font-secondary text-2xl font-bold text-txt dark:text-dark-text">
            My Biodata
          </h3>
          <div className="mt-4 space-y-3">
            <p className="flex justify-between items-center">
              <span className="text-txt/70 dark:text-dark-text-muted">
                Biodata ID:
              </span>
              <span className="font-mono font-bold text-lg text-txt dark:text-dark-text">
                {stats.biodata?.biodataId || "N/A"}
              </span>
            </p>
            <p className="flex justify-between items-center">
              <span className="text-txt/70 dark:text-dark-text-muted">
                Status:
              </span>
              {stats.isPremium ? (
                <span className="px-3 py-1 text-xs inline-flex justify-center items-center gap-1 font-semibold rounded-full bg-utility/10 text-utility">
                  <MdVerified /> Premium
                </span>
              ) : (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-secondary/20 dark:bg-dark-border">
                  🔓 Free
                </span>
              )}
            </p>
            <p className="flex justify-between items-center">
              <span className="text-txt/70 dark:text-dark-text-muted">
                Profile Complete:
              </span>
              {stats.biodata?.isCompleted ? (
                <span className="text-green-600 font-bold">Yes</span>
              ) : (
                <span className="text-accent font-bold">No</span>
              )}
            </p>
          </div>
          <Link
            to="/dashboard/edit-biodata"
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-accent py-2.5 font-semibold text-white transition-colors hover:bg-accent/90"
          >
            <HiOutlinePencilAlt /> Edit Biodata
          </Link>
        </DashboardCard>

        {/* --- Contact Request Stats Card --- */}
        <DashboardCard className="lg:col-span-2 flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/2">
            <h3 className="font-secondary text-2xl font-bold text-txt dark:text-dark-text">
              Contact Requests
            </h3>
            <div className="mt-4 space-y-3">
              <p className="flex justify-between font-medium text-txt dark:text-dark-text">
                <span>Total Sent:</span>{" "}
                <span>{stats.contactStats?.total || 0}</span>
              </p>
              <p className="flex justify-between text-green-600">
                <span>Approved:</span>{" "}
                <span>{stats.contactStats?.approved || 0}</span>
              </p>
              <p className="flex justify-between text-yellow-600">
                <span>Pending:</span>{" "}
                <span>{stats.contactStats?.pending || 0}</span>
              </p>
            </div>
            <Link
              to="/dashboard/my-contact-requests"
              className="mt-4 text-sm font-semibold text-accent hover:underline inline-flex items-center gap-1"
            >
              View All Requests <HiOutlineArrowRight />
            </Link>
          </div>
          <div className="w-full md:w-1/2 h-40">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={contactChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  fill="#8884d8"
                >
                  {contactChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        {/* --- Favourites Card --- */}
        <DashboardCard>
          <h3 className="font-secondary text-2xl font-bold text-txt dark:text-dark-text">
            My Favourites
          </h3>
          <div className="flex items-center gap-4 mt-4">
            <FaHeart className="text-4xl text-accent" />
            <div>
              <p className="text-3xl font-bold text-txt dark:text-dark-text">
                {stats.favouritesCount}
              </p>
              <p className="text-txt/70 dark:text-dark-text-muted">
                Profiles Saved
              </p>
            </div>
          </div>
          {stats.favouritesCount > 0 ? (
            <Link
              to="/dashboard/favourites"
              className="mt-4 text-sm font-semibold text-accent hover:underline inline-flex items-center gap-1"
            >
              View Favourites <HiOutlineArrowRight />
            </Link>
          ) : (
            <p className="mt-4 text-sm text-txt/70 dark:text-dark-text-muted">
              You haven't favourited any profiles yet. Start exploring!
            </p>
          )}
        </DashboardCard>

        {/* --- Progress Steps Card --- */}
        <DashboardCard>
          <h3 className="font-secondary text-2xl font-bold text-txt dark:text-dark-text mb-4">
            Your Journey
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              {stats.biodata?.isCompleted ? (
                <HiOutlineCheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <HiOutlineXCircle className="h-6 w-6 text-gray-400" />
              )}
              <span
                className={`dark:text-dark-text ${
                  stats.biodata?.isCompleted
                    ? ""
                    : "text-txt/60 dark:text-dark-text-muted"
                }`}
              >
                Completed Biodata
              </span>
            </li>
            <li className="flex items-center gap-3">
              {stats.contactStats?.total > 0 ? (
                <HiOutlineCheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <HiOutlineXCircle className="h-6 w-6 text-gray-400" />
              )}
              <span
                className={`dark:text-dark-text ${
                  stats.contactStats?.total > 0
                    ? ""
                    : "text-txt/60 dark:text-dark-text-muted"
                }`}
              >
                Sent a Contact Request
              </span>
            </li>
            <li className="flex items-center gap-3">
              {stats.successStory ? (
                <HiOutlineCheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <HiOutlineXCircle className="h-6 w-6 text-gray-400" />
              )}
              <span
                className={`dark:text-dark-text ${
                  stats.successStory
                    ? ""
                    : "text-txt/60 dark:text-dark-text-muted"
                }`}
              >
                Submitted Success Story
              </span>
            </li>
          </ul>
        </DashboardCard>

        {/* --- Success Story Card (Conditional) --- */}
        {stats.successStory && (
          <DashboardCard className="lg:col-span-3 flex flex-col md:flex-row items-center gap-6">
            <img
              src={stats.successStory.coupleImage}
              alt="Our Success Story"
              className="w-full md:w-1/3 h-48 object-cover rounded-lg shadow-md"
            />
            <div className="flex-1">
              <h3 className="font-secondary text-2xl font-bold text-txt dark:text-dark-text">
                Our Success Story
              </h3>
              <p className="text-sm mt-2 text-txt/70 dark:text-dark-text-muted">
                <span className="font-semibold">Partner ID:</span>{" "}
                {stats.successStory.partnerBiodataId} |{" "}
                <span className="font-semibold">Marriage Date:</span>{" "}
                {new Date(stats.successStory.marriageDate).toLocaleDateString()}
              </p>
              <p className="mt-2 text-sm text-txt dark:text-dark-text italic">
                "{stats.successStory.successStory.substring(0, 100)}..."
              </p>
              <div className="mt-4 flex items-center gap-4">
                <span className="font-semibold text-txt dark:text-dark-text">
                  Status:
                </span>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    stats.successStory.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {stats.successStory.status}
                </span>
              </div>
            </div>
          </DashboardCard>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
