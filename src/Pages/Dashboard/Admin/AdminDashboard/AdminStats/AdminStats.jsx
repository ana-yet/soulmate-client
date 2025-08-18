import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Link } from "react-router";
import {
  FaUsers,
  FaUserTie,
  FaVenusMars,
  FaHeart,
  FaHandshake,
  FaMoneyBillWave,
} from "react-icons/fa";
import StatCard from "./StatCard/StatCard";

const AdminStats = ({ stats }) => {
  // Color palette from theme
  const colors = {
    background: "#faf6f0",
    secondary: "#dcd8d3",
    accent: "#8e242c",
    txt: "#3c322e",
    utility: "#b38b59",
    darkBg: "#1a1d24",
    darkSecondary: "#252a34",
    darkText: "#e0e0e0",
    darkTextMuted: "#a8a8a8",
    darkBorder: "#333a45",
  };

  // Data for pie charts
  const userData = [
    { name: "Regular Users", value: stats?.totalUsers - stats.premiumUsers },
    { name: "Premium Users", value: stats?.premiumUsers },
  ];

  const biodataData = [
    { name: "Male Biodata", value: stats?.maleBiodata },
    { name: "Female Biodata", value: stats?.femaleBiodata },
  ];

  const premiumBiodataData = [
    { name: "Male Premium", value: stats?.malePremiumBiodata },
    { name: "Female Premium", value: stats?.femalePremiumBiodata },
  ];

  const successStoriesData = [
    { name: "Approved", value: stats?.approvedSuccessStories },
    { name: "Pending", value: stats?.pendingSuccessStories },
  ];

  const contactRequestsData = [
    { name: "Approved", value: stats?.approvedContactRequests },
    { name: "Pending", value: stats?.pendingContactRequests },
  ];

  const COLORS = [colors.utility, colors.accent, colors.secondary];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-background/50 dark:bg-dark-bg py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users */}
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<FaUsers size={20} />}
          link={{ to: "/dashboard/manage-users", text: "Manage Users" }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={userData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={60}
                innerRadius={30}
                fill="#8884d8"
                dataKey="value"
              >
                {userData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.darkSecondary,
                  borderColor: colors.darkBorder,
                  borderRadius: "8px",
                  color: colors.darkText,
                }}
              />
              <Legend
                wrapperStyle={{
                  fontSize: "12px",
                  paddingTop: "10px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </StatCard>

        {/* Premium Users */}
        <StatCard
          title="Premium Users"
          value={stats.premiumUsers}
          icon={<FaUserTie size={20} />}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={userData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={60}
                innerRadius={30}
                fill="#8884d8"
                dataKey="value"
              >
                {userData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.darkSecondary,
                  borderColor: colors.darkBorder,
                  borderRadius: "8px",
                  color: colors.darkText,
                }}
              />
              <Legend
                wrapperStyle={{
                  fontSize: "12px",
                  paddingTop: "10px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </StatCard>

        {/* Total Biodata */}
        <StatCard
          title="Total Biodata"
          value={stats.totalBiodata}
          icon={<FaVenusMars size={20} />}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={biodataData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={60}
                innerRadius={30}
                fill="#8884d8"
                dataKey="value"
              >
                {biodataData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.darkSecondary,
                  borderColor: colors.darkBorder,
                  borderRadius: "8px",
                  color: colors.darkText,
                }}
              />
              <Legend
                wrapperStyle={{
                  fontSize: "12px",
                  paddingTop: "10px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </StatCard>

        {/* Premium Biodata */}
        <StatCard
          title="Premium Biodata"
          value={stats.premiumBiodata}
          icon={<FaUserTie size={20} />}
          link={{ to: "/dashboard/approve-premium", text: "Manage Premium" }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={premiumBiodataData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={60}
                innerRadius={30}
                fill="#8884d8"
                dataKey="value"
              >
                {premiumBiodataData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.darkSecondary,
                  borderColor: colors.darkBorder,
                  borderRadius: "8px",
                  color: colors.darkText,
                }}
              />
              <Legend
                wrapperStyle={{
                  fontSize: "12px",
                  paddingTop: "10px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </StatCard>

        {/* Success Stories */}
        <StatCard
          title="Success Stories"
          value={stats.totalSuccessStories}
          icon={<FaHeart size={20} />}
          link={{
            to: "/dashboard/approve-married",
            text: "Manage Stories",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={successStoriesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={60}
                innerRadius={30}
                fill="#8884d8"
                dataKey="value"
              >
                {successStoriesData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.darkSecondary,
                  borderColor: colors.darkBorder,
                  borderRadius: "8px",
                  color: colors.darkText,
                }}
              />
              <Legend
                wrapperStyle={{
                  fontSize: "12px",
                  paddingTop: "10px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </StatCard>

        {/* Contact Requests */}
        <StatCard
          title="Contact Requests"
          value={stats.totalContactRequests}
          icon={<FaHandshake size={20} />}
          link={{
            to: "/dashboard/approve-contacts",
            text: "Manage Requests",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={contactRequestsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={60}
                innerRadius={30}
                fill="#8884d8"
                dataKey="value"
              >
                {contactRequestsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: colors.darkSecondary,
                  borderColor: colors.darkBorder,
                  borderRadius: "8px",
                  color: colors.darkText,
                }}
              />
              <Legend
                wrapperStyle={{
                  fontSize: "12px",
                  paddingTop: "10px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </StatCard>

        {/* Total Revenue */}
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue}`}
          icon={<FaMoneyBillWave size={20} />}
        >
          <div className="flex items-center justify-center h-full">
            <p className="font-secondary text-3xl font-bold text-accent">
              ${stats.totalRevenue}
            </p>
          </div>
        </StatCard>
      </div>
    </div>
  );
};

export default AdminStats;
