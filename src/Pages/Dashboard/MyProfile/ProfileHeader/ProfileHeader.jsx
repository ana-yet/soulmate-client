import { FaMapPin } from "react-icons/fa";
import { HiOutlinePencil } from "react-icons/hi";

const ProfileHeader = ({ profile, onEdit }) => {
  const getFieldValue = (value, defaultValue = "Not specified") =>
    value?.trim() || defaultValue;

  return (
    <div className="relative">
      {/* Cover Photo */}
      <div className="h-48 bg-gradient-to-r from-accent/20 to-utility/20 dark:from-dark-accent/30 dark:to-dark-utility/30"></div>

      {/* Profile Info */}
      <div className="px-6 pt-4 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex items-end gap-4">
          <img
            src={profile.photoURL || "https://i.ibb.co/C3JY5rpG/test.png"}
            alt={profile.displayName || "User"}
            className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-dark-secondary shadow-lg"
          />
          <div>
            <h1 className="font-secondary text-3xl font-bold text-txt dark:text-dark-text">
              {getFieldValue(profile.name, "Your Name")}
            </h1>
            <p className="text-txt/80 dark:text-dark-text-muted">
              {profile.email}
            </p>
            <p className="flex items-center gap-1 text-txt/80 dark:text-dark-text-muted mt-1">
              <FaMapPin className="text-utility dark:text-dark-utility" />
              {getFieldValue(profile.location, "Add your location")}
            </p>
          </div>
        </div>

        <button
          onClick={onEdit}
          className="inline-flex items-center gap-2 rounded-lg bg-accent dark:bg-dark-utility py-2 px-4 font-medium text-white shadow-sm transition-all hover:bg-accent/90 dark:hover:bg-dark-utility/90"
        >
          <HiOutlinePencil />
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
