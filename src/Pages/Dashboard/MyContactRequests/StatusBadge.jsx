const StatusBadge = ({ status }) => {
  const baseClasses =
    "px-3 py-1 text-xs font-semibold rounded-full inline-block";
  if (status === "approved") {
    return (
      <span
        className={`${baseClasses} bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300`}
      >
        Approved
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span
        className={`${baseClasses} bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400`}
      >
        Pending
      </span>
    );
  }
  return (
    <span className={`${baseClasses} bg-gray-100 text-gray-600`}>{status}</span>
  );
};
export default StatusBadge;
