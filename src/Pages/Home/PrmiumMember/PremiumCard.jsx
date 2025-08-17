import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaUser,
  FaVenusMars,
  FaCrown,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link } from "react-router";

const PremiumCard = ({ biodata }) => (
  <div className="group relative flex flex-col overflow-hidden rounded-xl border border-secondary/30 bg-background shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-dark-border dark:bg-dark-secondary">
    {/* Image section with premium crown */}
    <div className="relative h-64 w-full overflow-hidden">
      <img
        src={biodata.profileImage}
        alt={`${biodata.biodataType} biodata ${biodata.biodataId}`}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Premium crown badge */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
        <FaCrown className="text-yellow-200" />
        <span>EXCLUSIVE</span>
      </div>

      {/* Age badge */}
      <div className="absolute bottom-4 left-4 z-20 rounded-full bg-accent/90 px-3 py-1 text-sm font-bold text-white backdrop-blur-sm">
        {biodata.age} years
      </div>
    </div>

    {/* Card content */}
    <div className="flex flex-1 flex-col p-5">
      {/* Header section */}
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h3 className="font-secondary text-2xl font-bold text-txt dark:text-dark-text">
            #{biodata.biodataId}
          </h3>
          <p className="text-sm text-txt/70 dark:text-dark-text-muted">
            {biodata.occupation}
          </p>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
            biodata.biodataType === "Male"
              ? "bg-blue-100/80 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
              : "bg-pink-100/80 text-pink-800 dark:bg-pink-900/50 dark:text-pink-200"
          }`}
        >
          <FaVenusMars className="mr-1" />
          {biodata.biodataType}
        </span>
      </div>

      {/* Details section */}
      <div className="mb-5 space-y-3 text-sm text-txt/80 dark:text-dark-text-muted">
        <div className="flex items-center gap-3 rounded-lg bg-secondary/20 p-3 dark:bg-dark-border/20">
          <FaMapMarkerAlt className="text-accent shrink-0" />
          <span className="font-medium">{biodata.permanentDivision}</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 rounded-lg bg-secondary/20 p-3 dark:bg-dark-border/20">
            <FaUser className="text-accent shrink-0" />
            <span className="font-medium">{biodata.height || "5'7\""}</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-secondary/20 p-3 dark:bg-dark-border/20">
            <FaBriefcase className="text-accent shrink-0" />
            <span className="font-medium">
              {biodata.education || "Graduate"}
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons with gradients */}
      <div className="mt-auto flex gap-3">
        <Link
          to={`/biodata/${biodata._id}`}
          className="flex-1 rounded-lg bg-gradient-to-r from-accent to-accent-dark py-3 text-center font-bold text-white transition-all hover:opacity-90 hover:shadow-md"
        >
          View Profile
        </Link>
      </div>
    </div>
  </div>
);

export default PremiumCard;
