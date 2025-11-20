import { FaMapPin } from "react-icons/fa";
import {
  HiOutlineUserCircle,
  HiOutlineCalendar,
  HiOutlineCake,
  HiOutlineGlobe,
  HiOutlineBookOpen,
} from "react-icons/hi";

const PersonalInfoSection = ({ profile }) => {
  const getFieldValue = (value, defaultValue = "Not specified") =>
    value?.trim() || defaultValue;

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="space-y-6">
      <h2 className="font-secondary text-2xl font-bold text-txt dark:text-dark-text border-b pb-2 border-secondary/20 dark:border-dark-border">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <HiOutlineUserCircle className="text-utility dark:text-dark-utility mt-1 text-xl" />
            <div>
              <h3 className="font-medium text-txt dark:text-dark-text">
                About Me
              </h3>
              <p className="text-txt/80 dark:text-dark-text-muted">
                {getFieldValue(profile.about, "Tell others about yourself")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <HiOutlineCalendar className="text-utility dark:text-dark-utility mt-1 text-xl" />
            <div>
              <h3 className="font-medium text-txt dark:text-dark-text">Age</h3>
              <p className="text-txt/80 dark:text-dark-text-muted">
                {profile.age || "Not specified"} years
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <HiOutlineCake className="text-utility dark:text-dark-utility mt-1 text-xl" />
            <div>
              <h3 className="font-medium text-txt dark:text-dark-text">
                Date of Birth
              </h3>
              <p className="text-txt/80 dark:text-dark-text-muted">
                {formatDate(profile.dob)}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <FaMapPin className="text-utility dark:text-dark-utility mt-1 text-xl" />
            <div>
              <h3 className="font-medium text-txt dark:text-dark-text">
                Location
              </h3>
              <p className="text-txt/80 dark:text-dark-text-muted">
                {getFieldValue(profile.location)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <HiOutlineGlobe className="text-utility dark:text-dark-utility mt-1 text-xl" />
            <div>
              <h3 className="font-medium text-txt dark:text-dark-text">
                Languages
              </h3>
              <p className="text-txt/80 dark:text-dark-text-muted">
                {profile.languages?.join(", ") || "Not specified"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <HiOutlineBookOpen className="text-utility dark:text-dark-utility mt-1 text-xl" />
            <div>
              <h3 className="font-medium text-txt dark:text-dark-text">
                Education
              </h3>
              <p className="text-txt/80 dark:text-dark-text-muted">
                {getFieldValue(profile.education)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalInfoSection;
