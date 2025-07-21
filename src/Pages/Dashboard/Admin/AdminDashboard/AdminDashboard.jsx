import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import useAdminDashboardStats from "../../../../Hook/useAdminDashboardStats";

const AdminDashboard = () => {
  const { data: stats, isLoading, isError, error } = useAdminDashboardStats();

  // Data for the Pie Chart
  const pieChartData = [
    { name: "Male Biodata", value: stats?.maleBiodata || 0 },
    { name: "Female Biodata", value: stats?.femaleBiodata || 0 },
  ];
  const PIE_COLORS = ["#A68EBB", "#C2185B"]; // secondary, accent

  // Data for the Bar Chart now includes Revenue
  const barChartData = [
    { name: "Total Biodata", value: stats?.totalBiodata || 0, fill: "#8884d8" },
    { name: "Premium", value: stats?.premiumBiodata || 0, fill: "#82ca9d" },
    { name: "Marriages", value: stats?.totalMarriages || 0, fill: "#ffc658" },
    { name: "Revenue ($)", value: stats?.totalRevenue || 0, fill: "#8E242C" },
  ];

  if (isError) {
    return (
      <div className="text-center p-10 text-accent">Error: {error.message}</div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="font-secondary text-3xl font-bold text-txt dark:text-dark-text">
          Admin Dashboard
        </h1>
        {/* Total Revenue Display has been removed and integrated into the bar chart below */}
      </div>

      {/* --- Charts Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart for Gender Distribution */}
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
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
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

        {/* Bar Chart for Key Metrics */}
        <div className="bg-white dark:bg-dark-secondary rounded-2xl shadow-lg p-6 border border-secondary/20 dark:border-dark-border">
          <h2 className="font-secondary text-2xl font-bold text-txt dark:text-dark-text mb-6">
            Overall Statistics
          </h2>
          {isLoading ? (
            <div className="h-80 w-full bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          ) : (
            <div style={{ width: "100%", height: 400 }}>
              <ResponsiveContainer>
                <BarChart
                  data={barChartData}
                  margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "10px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="value">
                    {barChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
