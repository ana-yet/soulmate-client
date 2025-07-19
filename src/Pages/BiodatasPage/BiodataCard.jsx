import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaUser,
  FaVenusMars,
} from "react-icons/fa";
import { Link } from "react-router";

const BiodataCard = ({ biodata }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="group relative flex flex-col overflow-hidden rounded-2xl border border-secondary/20 dark:border-dark-border bg-white dark:bg-dark-secondary shadow-sm"
  >
    <div className="relative">
      <img
        src={biodata.profileImage}
        alt={`Biodata ${biodata.biodataId}`}
        className="h-72 w-full object-cover"
      />
      <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100 items-center justify-center">
        <Link
          to={`/biodata/${biodata._id}`}
          className="rounded-full bg-accent px-6 py-2 font-semibold text-white shadow-md transition-transform duration-300 transform scale-90 group-hover:scale-100"
        >
          View Profile
        </Link>
      </div>
    </div>

    <div className="flex flex-1 flex-col p-5">
      <h3 className="font-secondary text-xl font-bold text-txt dark:text-dark-text">
        Biodata ID: {biodata.biodataId}
      </h3>
      <div className="mt-4 flex-1 space-y-3 text-txt/80 dark:text-dark-text-muted">
        <p className="flex items-center gap-3">
          <FaVenusMars className="text-accent" /> {biodata.biodataType}
        </p>
        <p className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-accent" /> {biodata.permanentDivision}
        </p>
        <p className="flex items-center gap-3">
          <FaUser className="text-accent" /> Age: {biodata.age}
        </p>
        <p className="flex items-center gap-3">
          <FaBriefcase className="text-accent" /> {biodata.occupation}
        </p>
      </div>
    </div>

    {/* Button for small screens only */}
    <div className="block md:hidden p-4 pt-0">
      <Link
        to={`/biodata/${biodata._id}`}
        className="w-full block text-center rounded-lg bg-accent px-6 py-2 font-semibold text-white shadow-md"
      >
        View Profile
      </Link>
    </div>
  </motion.div>
);

export default BiodataCard;
