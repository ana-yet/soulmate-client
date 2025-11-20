import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaUser,
  FaVenusMars,
  FaCrown,
  FaArrowRight,
  FaGraduationCap,
} from "react-icons/fa";
import { Link } from "react-router";

const PremiumCard = ({ biodata }) =>(
<div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-500 hover:-translate-y-2  dark:bg-dark-secondary">
    {/* Gradient Border Effect on Hover */}
    <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-pink-500 to-amber-400 opacity-20 blur-xl"></div>
    </div>

    {/* Image Section */}
    <div className="relative h-80 w-full overflow-hidden z-10">
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 opacity-80 transition-opacity duration-300 group-hover:opacity-70"></div>
      <img
        src={biodata.profileImage}
        alt={`Biodata ${biodata.biodataId}`}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Premium Badge - Floating with Glow */}
      <div className="absolute top-4 right-4 z-20 animate-bounce-slow">
        <div className="relative flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600 px-3 py-1 text-xs font-bold text-white shadow-[0_0_15px_rgba(245,158,11,0.5)] ring-1 ring-white/30 backdrop-blur-md">
          <FaCrown className="text-yellow-100 drop-shadow-md" />
          <span className="tracking-wide">PREMIUM</span>
        </div>
      </div>

      {/* Floating Info on Image */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-5 translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
        <div className="flex items-center justify-between mb-1">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold backdrop-blur-md ${
              biodata.biodataType === "Male"
                ? "bg-blue-500/20 text-blue-100 border border-blue-400/30"
                : "bg-pink-500/20 text-pink-100 border border-pink-400/30"
            }`}
          >
            <FaVenusMars className="mr-1.5" />
            {biodata.biodataType}
          </span>
          <span className="text-sm font-medium text-white/90 bg-black/30 px-2 py-0.5 rounded-md backdrop-blur-sm border border-white/10">
            ID: {biodata.biodataId}
          </span>
        </div>

        <h3 className="font-secondary text-2xl font-bold text-white drop-shadow-lg truncate">
          {biodata.occupation || "Member"}
        </h3>

        <div className="flex items-center gap-2 text-white/80 text-sm mt-1">
          <FaMapMarkerAlt className="text-amber-400" />
          <span className="truncate">{biodata.permanentDivision}</span>
        </div>
      </div>
    </div>

    {/* Card Content */}
    <div className="relative flex flex-1 flex-col p-5 z-10 bg-white/50 dark:bg-dark-secondary/50 backdrop-blur-sm">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="flex items-center gap-3 rounded-xl bg-secondary/10 p-2.5 transition-colors group-hover:bg-secondary/20 dark:bg-dark-border/30">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent dark:bg-accent/20">
            <FaUser size={12} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-txt/50 dark:text-dark-text-muted/70">Age</span>
            <span className="text-sm font-bold text-txt dark:text-dark-text">{biodata.age} yrs</span>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-secondary/10 p-2.5 transition-colors group-hover:bg-secondary/20 dark:bg-dark-border/30">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent dark:bg-accent/20">
            <FaGraduationCap size={12} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-txt/50 dark:text-dark-text-muted/70">Education</span>
            <span className="text-sm font-bold text-txt dark:text-dark-text truncate max-w-[80px]">
              {biodata.educationLevel || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-auto">
        <Link
          to={`/biodata/${biodata._id}`}
          className="group/btn relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-accent to-pink-600 p-[1px] transition-all focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          <div className="relative flex w-full items-center justify-center gap-2 rounded-[11px] bg-white px-4 py-2.5 text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-pink-600 transition-all group-hover/btn:bg-transparent group-hover/btn:text-white dark:bg-dark-secondary">
            <span>View Full Profile</span>
            <FaArrowRight className="text-accent transition-transform group-hover/btn:translate-x-1 group-hover/btn:text-white" />
          </div>
        </Link>
      </div>
    </div>
  </div>
)
export default PremiumCard;
