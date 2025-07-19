import { useNavigate } from "react-router";
import { HiOutlineArrowLeft } from "react-icons/hi";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-2 rounded-lg border border-secondary/50 dark:border-dark-border px-4 py-2 text-sm font-semibold text-txt dark:text-dark-text bg-white dark:bg-dark-secondary hover:bg-secondary/10 dark:hover:bg-dark-border transition-colors"
    >
      <HiOutlineArrowLeft className="h-4 w-4" />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
