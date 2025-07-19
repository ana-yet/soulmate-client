const ProfileField = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <span className="mt-1 text-accent">{icon}</span>
    <div>
      <p className="text-sm font-semibold text-txt/60 dark:text-dark-text-muted">
        {label}
      </p>
      <p className="text-lg font-medium text-txt dark:text-dark-text">
        {value || "N/A"}
      </p>
    </div>
  </div>
);
export default ProfileField;
