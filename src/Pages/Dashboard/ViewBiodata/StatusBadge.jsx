const StatusBadge = ({ status }) => {
  if (status === "premium") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-utility/10 px-4 py-1 text-sm font-semibold text-utility">
        ✅ Premium
      </span>
    );
  }
  if (status === "pending") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-600">
        ⏳ Pending Approval
      </span>
    );
  }
  return null;
};
export default StatusBadge;
