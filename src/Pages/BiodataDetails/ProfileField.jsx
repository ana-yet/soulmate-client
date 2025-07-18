const ProfileField = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <span className="mt-1 text-accent text-lg">{icon}</span>
    <div>
      <p className="text-sm font-semibold text-txt/60">{label}</p>
      <p className="text-lg font-medium text-txt">{value || "N/A"}</p>
    </div>
  </div>
);
export default ProfileField;
