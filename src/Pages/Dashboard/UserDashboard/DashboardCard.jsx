const DashboardCard = ({ children, className = "" }) => (
  <div
    className={`bg-white dark:bg-dark-secondary rounded-2xl shadow-lg p-6 border border-secondary/20 dark:border-dark-border ${className}`}
  >
    {children}
  </div>
);
export default DashboardCard;
