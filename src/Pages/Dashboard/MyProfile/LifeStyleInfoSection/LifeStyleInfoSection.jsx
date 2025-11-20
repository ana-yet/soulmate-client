import { HiOutlineHeart, HiOutlineHome, HiOutlineUsers } from "react-icons/hi";

const LifestyleInfoSection = ({ profile }) => {
  const getFieldValue = (value, defaultValue = "Not specified") =>
    value?.trim() || defaultValue;

  return (
    <section className="space-y-6">
      <h2 className="font-secondary text-2xl font-bold text-txt dark:text-dark-text border-b pb-2 border-secondary/20 dark:border-dark-border">
        Lifestyle
      </h2>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <HiOutlineHeart className="text-utility dark:text-dark-utility mt-1 text-xl" />
          <div>
            <h3 className="font-medium text-txt dark:text-dark-text">
              Hobbies
            </h3>
            <p className="text-txt/80 dark:text-dark-text-muted">
              {profile.hobbies?.join(", ") || "Not specified"}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <HiOutlineHome className="text-utility dark:text-dark-utility mt-1 text-xl" />
          <div>
            <h3 className="font-medium text-txt dark:text-dark-text">
              Living Situation
            </h3>
            <p className="text-txt/80 dark:text-dark-text-muted">
              {getFieldValue(profile.livingSituation)}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <HiOutlineUsers className="text-utility dark:text-dark-utility mt-1 text-xl" />
          <div>
            <h3 className="font-medium text-txt dark:text-dark-text">
              Interests
            </h3>
            <p className="text-txt/80 dark:text-dark-text-muted">
              {profile.interests?.join(", ") || "Not specified"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleInfoSection;
