import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router";

const SimilarProfileCard = ({ biodata }) => (
  <div className="group rounded-xl border border-secondary/20 dark:border-dark-border bg-white dark:bg-dark-secondary p-6 text-center transition-all hover:shadow-lg hover:-translate-y-1 hover:border-accent/30 dark:hover:border-dark-utility/50">
    <div className="relative inline-block">
      <img
        src={biodata.profileImage}
        alt={`Biodata ${biodata.biodataId}`}
        className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-dark-secondary shadow-lg group-hover:border-accent/20 dark:group-hover:border-dark-utility/30 transition-all"
      />
      <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-accent dark:bg-dark-utility text-white text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">
        {biodata.biodataType}
      </span>
    </div>

    <div className="mt-6 space-y-1">
      <h4 className="font-secondary text-lg font-bold text-txt dark:text-dark-text">
        Biodata ID: {biodata.biodataId}
      </h4>
      <p className="text-sm text-txt/70 dark:text-dark-text-muted">
        {biodata.permanentDivision}
      </p>
      <p className="text-sm text-txt/70 dark:text-dark-text-muted">
        Age: {biodata.age} | Height: {biodata.height}
      </p>
    </div>

    <Link
      to={`/biodata/${biodata._id}`}
      className="mt-6 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-accent/10 dark:bg-dark-utility/10 text-accent dark:text-dark-utility font-medium hover:bg-accent/20 dark:hover:bg-dark-utility/20 transition-colors"
    >
      View Profile
      <HiArrowRight className="transition-transform group-hover:translate-x-1" />
    </Link>
  </div>
);

export default SimilarProfileCard;
