import {
  HiOutlineBriefcase,
  HiOutlineAcademicCap,
  HiOutlineCurrencyDollar,
  HiOutlineStar,
} from "react-icons/hi";

const ProfessionalInfoSection = ({ profile }) => {
  const getFieldValue = (value, defaultValue = "Not specified") =>
    value?.trim() || defaultValue;

  return (
    <section className="space-y-6">
      <h2 className="font-secondary text-2xl font-bold text-txt dark:text-dark-text border-b pb-2 border-secondary/20 dark:border-dark-border">
        Professional Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <HiOutlineBriefcase className="text-utility dark:text-dark-utility mt-1 text-xl" />
            <div>
              <h3 className="font-medium text-txt dark:text-dark-text">
                Occupation
              </h3>
              <p className="text-txt/80 dark:text-dark-text-muted">
                {getFieldValue(profile.occupation)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <HiOutlineAcademicCap className="text-utility dark:text-dark-utility mt-1 text-xl" />
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

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <HiOutlineCurrencyDollar className="text-utility dark:text-dark-utility mt-1 text-xl" />
            <div>
              <h3 className="font-medium text-txt dark:text-dark-text">
                Income
              </h3>
              <p className="text-txt/80 dark:text-dark-text-muted">
                {getFieldValue(profile.income)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <HiOutlineStar className="text-utility dark:text-dark-utility mt-1 text-xl" />
            <div>
              <h3 className="font-medium text-txt dark:text-dark-text">
                Skills
              </h3>
              <p className="text-txt/80 dark:text-dark-text-muted">
                {profile.skills?.join(", ") || "Not specified"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalInfoSection;
