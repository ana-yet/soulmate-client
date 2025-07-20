const StatusBadge = ({ status }) => (
  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400">
    {status}
  </span>
);
export default StatusBadge;
