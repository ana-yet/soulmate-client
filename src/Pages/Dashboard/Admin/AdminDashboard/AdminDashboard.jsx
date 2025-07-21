import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  HiOutlineUsers,
  HiOutlineCurrencyDollar,
  HiOutlineStar,
  HiOutlineUserGroup,
} from "react-icons/hi";
import useAdminDashboardStats from "../../../../Hook/useAdminDashboardStats";

// --- End of Placeholder Hooks ---

// Reusable Stat Card Component
const StatCard = ({ icon, title, value, colorClass }) => (
  <div
    className={`flex items-center p-6 bg-white dark:bg-dark-secondary rounded-2xl shadow-lg border border-secondary/20 dark:border-dark-border`}
  >
    <div className={`p-4 rounded-full ${colorClass}`}>{icon}</div>
    <div className="ml-4">
      <p className="text-lg font-semibold text-txt dark:text-dark-text">
        {value}
      </p>
      <p className="text-sm text-txt/70 dark:text-dark-text-muted">{title}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { data: stats, isLoading, isError, error } = useAdminDashboardStats();

  const pieChartData = [
    { name: "Male Biodata", value: stats?.maleBiodata || 0 },
    { name: "Female Biodata", value: stats?.femaleBiodata || 0 },
  ];

  const COLORS = ["#A68EBB", "#C2185B"];

  if (isError) {
    return (
      <div className="text-center p-10 text-accent">Error: {error.message}</div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="font-secondary text-3xl font-bold text-txt dark:text-dark-text">
        Admin Dashboard
      </h1>

      {/* --- Stats Cards --- */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-28 bg-white dark:bg-dark-secondary rounded-2xl shadow-lg animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<HiOutlineUserGroup className="h-8 w-8 text-blue-600" />}
            title="Total Biodata"
            value={stats.totalBiodata}
            colorClass="bg-blue-100 dark:bg-blue-900/50"
          />
          <StatCard
            icon={<HiOutlineStar className="h-8 w-8 text-utility" />}
            title="Premium Biodata"
            value={stats.premiumBiodata}
            colorClass="bg-utility/10 dark:bg-utility/20"
          />
          <StatCard
            icon={
              <HiOutlineCurrencyDollar className="h-8 w-8 text-green-600" />
            }
            title="Total Revenue"
            value={`$${stats.totalRevenue}`}
            colorClass="bg-green-100 dark:bg-green-900/50"
          />
          <StatCard
            icon={<HiOutlineUsers className="h-8 w-8 text-accent" />}
            title="Total Marriages"
            value={stats.totalMarriages || 0}
            colorClass="bg-accent/10 dark:bg-accent/20"
          />
        </div>
      )}

      {/* --- Charts Section --- */}
      <div className="bg-white dark:bg-dark-secondary rounded-2xl shadow-lg p-6 border border-secondary/20 dark:border-dark-border">
        <h2 className="font-secondary text-2xl font-bold text-txt dark:text-dark-text mb-6">
          Biodata Distribution
        </h2>
        {isLoading ? (
          <div className="h-80 w-full bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        ) : (
          <div style={{ width: "100%", height: 400 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
