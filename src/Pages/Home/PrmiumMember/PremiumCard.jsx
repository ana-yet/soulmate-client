import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaStar,
  FaUser,
  FaVenusMars,
} from "react-icons/fa";
import { Link } from "react-router";

const PremiumCard = ({ biodata }) => (
  <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-secondary/20 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="relative">
      <img
        src={biodata.profileImage}
        alt={`Biodata ${biodata._id}`}
        className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-utility/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
        <FaStar />
        <span>Premium</span>
      </div>
    </div>
    <div className="flex flex-1 flex-col p-5">
      <h3 className="font-secondary text-xl font-bold text-txt">
        Biodata ID: {biodata.biodataId}
      </h3>
      <div className="mt-4 flex-1 flex justify-between space-y-3 text-txt/80">
        <div>
          <p className="flex items-center gap-3">
            <FaVenusMars className="text-accent" /> {biodata.biodataType}
          </p>
          <p className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-accent" />{" "}
            {biodata.permanentDivision}
          </p>
        </div>
        <div>
          <p className="flex items-center gap-3">
            <FaUser className="text-accent" /> Age: {biodata.age}
          </p>
          <p className="flex items-center gap-3">
            <FaBriefcase className="text-accent" /> {biodata.occupation}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <Link
          to={`/biodata/${biodata._id}`}
          className="w-full block rounded-lg bg-accent py-2.5 text-center font-semibold text-white transition-all duration-300 hover:bg-accent/90"
        >
          View Profile
        </Link>
      </div>
    </div>
  </div>
);
export default PremiumCard;
