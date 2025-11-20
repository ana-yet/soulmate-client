import { useForm } from "react-hook-form";
import {
  HiOutlineUserCircle,
  HiOutlineCalendar,
  HiOutlineCake,
  HiOutlineGlobe,
  HiOutlineBookOpen,
  HiOutlineBriefcase,
  HiOutlineAcademicCap,
  HiOutlineCurrencyDollar,
  HiOutlineStar,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineUsers,
} from "react-icons/hi";

const EditProfileForm = ({ profile, onCancel, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: profile.name || "",
      about: profile.about || "",
      age: profile.age || "",
      dob: profile.dob || "",
      location: profile.location || "",
      languages: profile.languages?.join(", ") || "",
      education: profile.education || "",
      occupation: profile.occupation || "",
      income: profile.income || "",
      skills: profile.skills?.join(", ") || "",
      hobbies: profile.hobbies?.join(", ") || "",
      interests: profile.interests?.join(", ") || "",
      livingSituation: profile.livingSituation || "",
      familyStatus: profile.familyStatus || "",
      parentsInfo: profile.parentsInfo || "",
      siblingsInfo: profile.siblingsInfo || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSave)} className="p-6 md:p-8 space-y-8">
      <h2 className="font-secondary text-3xl font-bold text-txt dark:text-dark-text">
        Edit Profile
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="font-secondary text-xl font-bold text-txt dark:text-dark-text border-b pb-2 border-secondary/20 dark:border-dark-border">
            Personal Information
          </h3>

          <div>
            <label className="block text-sm font-medium text-txt dark:text-dark-text mb-1">
              Full Name
            </label>
            <input
              {...register("name")}
              className="w-full bg-white dark:bg-dark-secondary border border-secondary/20 dark:border-dark-border rounded-lg px-4 py-2 text-txt dark:text-dark-text focus:ring-2 focus:ring-accent dark:focus:ring-dark-utility focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-txt dark:text-dark-text mb-1">
              About Me
            </label>
            <textarea
              {...register("about")}
              rows={3}
              className="w-full bg-white dark:bg-dark-secondary border border-secondary/20 dark:border-dark-border rounded-lg px-4 py-2 text-txt dark:text-dark-text focus:ring-2 focus:ring-accent dark:focus:ring-dark-utility focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-txt dark:text-dark-text mb-1">
              Age
            </label>
            <input
              type="number"
              {...register("age")}
              className="w-full bg-white dark:bg-dark-secondary border border-secondary/20 dark:border-dark-border rounded-lg px-4 py-2 text-txt dark:text-dark-text focus:ring-2 focus:ring-accent dark:focus:ring-dark-utility focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-txt dark:text-dark-text mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              {...register("dob")}
              className="w-full bg-white dark:bg-dark-secondary border border-secondary/20 dark:border-dark-border rounded-lg px-4 py-2 text-txt dark:text-dark-text focus:ring-2 focus:ring-accent dark:focus:ring-dark-utility focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-txt dark:text-dark-text mb-1">
              Location
            </label>
            <input
              {...register("location")}
              className="w-full bg-white dark:bg-dark-secondary border border-secondary/20 dark:border-dark-border rounded-lg px-4 py-2 text-txt dark:text-dark-text focus:ring-2 focus:ring-accent dark:focus:ring-dark-utility focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-txt dark:text-dark-text mb-1">
              Languages (comma separated)
            </label>
            <input
              {...register("languages")}
              placeholder="e.g., English, Hindi, Bengali"
              className="w-full bg-white dark:bg-dark-secondary border border-secondary/20 dark:border-dark-border rounded-lg px-4 py-2 text-txt dark:text-dark-text focus:ring-2 focus:ring-accent dark:focus:ring-dark-utility focus:border-transparent"
            />
          </div>
        </div>

        {/* Professional Information */}
        <div className="space-y-4">
          <h3 className="font-secondary text-xl font-bold text-txt dark:text-dark-text border-b pb-2 border-secondary/20 dark:border-dark-border">
            Professional Information
          </h3>

          <div>
            <label className="block text-sm font-medium text-txt dark:text-dark-text mb-1">
              Education
            </label>
            <input
              {...register("education")}
              className="w-full bg-white dark:bg-dark-secondary border border-secondary/20 dark:border-dark-border rounded-lg px-4 py-2 text-txt dark:text-dark-text focus:ring-2 focus:ring-accent dark:focus:ring-dark-utility focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-txt dark:text-dark-text mb-1">
              Occupation
            </label>
            <input
              {...register("occupation")}
              className="w-full bg-white dark:bg-dark-secondary border border-secondary/20 dark:border-dark-border rounded-lg px-4 py-2 text-txt dark:text-dark-text focus:ring-2 focus:ring-accent dark:focus:ring-dark-utility focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-txt dark:text-dark-text mb-1">
              Income
            </label>
            <input
              {...register("income")}
              className="w-full bg-white dark:bg-dark-secondary border border-secondary/20 dark:border-dark-border rounded-lg px-4 py-2 text-txt dark:text-dark-text focus:ring-2 focus:ring-accent dark:focus:ring-dark-utility focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-txt dark:text-dark-text mb-1">
              Skills (comma separated)
            </label>
            <input
              {...register("skills")}
              placeholder="e.g., Cooking, Dancing, Painting"
              className="w-full bg-white dark:bg-dark-secondary border border-secondary/20 dark:border-dark-border rounded-lg px-4 py-2 text-txt dark:text-dark-text focus:ring-2 focus:ring-accent dark:focus:ring-dark-utility focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lifestyle */}
        <div className="space-y-4">
          <h3 className="font-secondary text-xl font-bold text-txt dark:text-dark-text border-b pb-2 border-secondary/20 dark:border-dark-border">
            Lifestyle
          </h3>

          <div>
            <label className="block text-sm font-medium text-txt dark:text-dark-text mb-1">
              Hobbies (comma separated)
            </label>
            <input
              {...register("hobbies")}
              placeholder="e.g., Reading, Traveling, Photography"
              className="w-full bg-white dark:bg-dark-secondary border border-secondary/20 dark:border-dark-border rounded-lg px-4 py-2 text-txt dark:text-dark-text focus:ring-2 focus:ring-accent dark:focus:ring-dark-utility focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-txt dark:text-dark-text mb-1">
              Interests (comma separated)
            </label>
            <input
              {...register("interests")}
              placeholder="e.g., Music, Movies, Sports"
              className="w-full bg-white dark:bg-dark-secondary border border-secondary/20 dark:border-dark-border rounded-lg px-4 py-2 text-txt dark:text-dark-text focus:ring-2 focus:ring-accent dark:focus:ring-dark-utility focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-txt dark:text-dark-text mb-1">
              Living Situation
            </label>
            <select
              {...register("livingSituation")}
              className="w-full bg-white dark:bg-dark-secondary border border-secondary/20 dark:border-dark-border rounded-lg px-4 py-2 text-txt dark:text-dark-text focus:ring-2 focus:ring-accent dark:focus:ring-dark-utility focus:border-transparent"
            >
              <option value="">Select</option>
              <option value="With Family">With Family</option>
              <option value="Alone">Alone</option>
              <option value="With Roommates">With Roommates</option>
            </select>
          </div>
        </div>

        {/* Family Information */}
        <div className="space-y-4">
          <h3 className="font-secondary text-xl font-bold text-txt dark:text-dark-text border-b pb-2 border-secondary/20 dark:border-dark-border">
            Family Information
          </h3>

          <div>
            <label className="block text-sm font-medium text-txt dark:text-dark-text mb-1">
              Family Status
            </label>
            <select
              {...register("familyStatus")}
              className="w-full bg-white dark:bg-dark-secondary border border-secondary/20 dark:border-dark-border rounded-lg px-4 py-2 text-txt dark:text-dark-text focus:ring-2 focus:ring-accent dark:focus:ring-dark-utility focus:border-transparent"
            >
              <option value="">Select</option>
              <option value="Middle Class">Middle Class</option>
              <option value="Upper Middle Class">Upper Middle Class</option>
              <option value="Affluent">Affluent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-txt dark:text-dark-text mb-1">
              Parents Information
            </label>
            <input
              {...register("parentsInfo")}
              placeholder="Father's occupation, Mother's occupation"
              className="w-full bg-white dark:bg-dark-secondary border border-secondary/20 dark:border-dark-border rounded-lg px-4 py-2 text-txt dark:text-dark-text focus:ring-2 focus:ring-accent dark:focus:ring-dark-utility focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-txt dark:text-dark-text mb-1">
              Siblings Information
            </label>
            <input
              {...register("siblingsInfo")}
              placeholder="Number of brothers and sisters"
              className="w-full bg-white dark:bg-dark-secondary border border-secondary/20 dark:border-dark-border rounded-lg px-4 py-2 text-txt dark:text-dark-text focus:ring-2 focus:ring-accent dark:focus:ring-dark-utility focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-secondary/20 dark:border-dark-border rounded-lg text-txt dark:text-dark-text hover:bg-secondary/10 dark:hover:bg-dark-border transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-accent dark:bg-dark-utility text-white rounded-lg hover:bg-accent/90 dark:hover:bg-dark-utility/90 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
