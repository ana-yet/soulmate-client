import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router";

// Reusable card for similar biodatas
const SimilarProfileCard = ({ biodata }) => (
  <div className="rounded-2xl border border-secondary/20 bg-white p-4 text-center transition-shadow hover:shadow-lg">
    <img
      src={biodata.profileImage}
      alt={`Biodata ${biodata.biodataId}`}
      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-md"
    />
    <h4 className="mt-3 font-bold text-txt">Biodata ID: {biodata.biodataId}</h4>
    <p className="text-sm text-txt/70">
      {biodata.permanentDivision} | Age: {biodata.age}
    </p>
    <Link
      to={`/biodata/${biodata._id}`}
      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
    >
      View Profile <HiArrowRight />
    </Link>
  </div>
);
export default SimilarProfileCard;
