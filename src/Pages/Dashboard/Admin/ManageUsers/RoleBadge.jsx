const RoleBadge = ({ role }) => (
  <span
    className={`px-2 py-1 text-xs font-semibold rounded-full ${
      role === "admin"
        ? "bg-accent/10 text-accent dark:bg-accent/20"
        : "bg-secondary/20 text-txt/80 dark:bg-dark-border dark:text-dark-text-muted"
    }`}
  >
    {role}
  </span>
);
export default RoleBadge;
