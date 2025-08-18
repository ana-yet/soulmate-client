import React from "react";
import { Helmet } from "react-helmet-async";
import AdminStats from "./AdminStats/AdminStats";
import useAdminDashboardStats from "../../../../Hook/useAdminDashboardStats";
import AdminStatsSkeleton from "./AdminStatsSkeleton/AdminStatsSkeleton";
import StatError from "./AdminStats/StatCard/StatError/StatError";

const META_DATA = {
  title: "Dashboard | SoulMate",
  description: "Find your perfect match with our trusted biodata service.",
  ogTitle: "SoulMate - Your SoulMate",
  ogType: "website",
};

const AdminDashboard = () => {
  const { data: stats, isLoading, isError, error } = useAdminDashboardStats();

  const renderContent = () => {
    if (isLoading) return <AdminStatsSkeleton count={3} />;
    if (isError) return <StatError error={error} />;
    return <AdminStats stats={stats} />;
  };

  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <Helmet>
        <title>{META_DATA.title}</title>
        <meta name="description" content={META_DATA.description} />
        <meta property="og:title" content={META_DATA.ogTitle} />
        <meta property="og:type" content={META_DATA.ogType} />
      </Helmet>

      <header className="space-y-1">
        <h1 className="font-secondary text-3xl font-bold text-txt dark:text-dark-text">
          Admin Dashboard
        </h1>
        <p className="text-txt/70 dark:text-dark-text-muted">
          Platform statistics and insights
        </p>
      </header>

      <section>{renderContent()}</section>
    </main>
  );
};

export default AdminDashboard;
