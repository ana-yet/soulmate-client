import React from "react";
import Swal from "sweetalert2";
import { HiOutlineTrash, HiOutlineEye } from "react-icons/hi";
import { Link } from "react-router";
import useAuth from "../../../Hook/useAuth";
import useRemoveFavourite from "../../../Hook/useRemoveFavourite ";
import useFavouritesList from "../../../Hook/useFavouritesList";
import TableHead from "./TableHead";
import { Helmet } from "react-helmet-async";

const MyFavouritesList = () => {
  const { user } = useAuth();

  const {
    data: favourites = [],
    isLoading,
    isError,
    error,
  } = useFavouritesList(user?.email);

  const { removeFromFavourites, isRemoving } = useRemoveFavourite();

  const handleDelete = (favouriteId, name) => {
    Swal.fire({
      title: `Remove ${name}?`,
      text: "Are you sure you want to remove this biodata from your favourites?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#C2185B",
      cancelButtonColor: "#4F4F4F",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromFavourites({ userEmail: user.email, biodataId: favouriteId });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10">
        {/* Simple Spinner */}
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-accent"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-10 text-accent">Error: {error.message}</div>
    );
  }

  if (!favourites || favourites.length === 0) {
    return (
      <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-2xl font-semibold text-txt dark:text-gray-200">
          No Favourites Yet
        </h3>
        <p className="mt-2 text-txt/70 dark:text-gray-400">
          You haven’t added any biodata to your favourites list.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6">
      <Helmet>
        <title>Favorites | SoulMate</title>
        <meta
          name="description"
          content="Find your perfect match with our trusted biodata service."
        />
        <meta property="og:title" content="SoulMate - Your SoulMate" />
        <meta property="og:type" content="website" />
      </Helmet>

      <h2 className="font-secondary text-3xl font-bold text-txt dark:text-white mb-6">
        My Favourites
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <TableHead />
          <tbody>
            {favourites.map((fav) => (
              <tr
                key={fav._id}
                className="border-b border-secondary/20 dark:border-gray-700 hover:bg-secondary/5 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td className="p-4 text-txt dark:text-gray-200 font-medium">
                  {fav.name}
                </td>
                <td className="p-4 text-txt/80 dark:text-gray-400 hidden md:table-cell">
                  {fav.biodataId}
                </td>
                <td className="p-4 text-txt/80 dark:text-gray-400 hidden lg:table-cell">
                  {fav.permanentDivision}
                </td>
                <td className="p-4 text-txt/80 dark:text-gray-400 hidden md:table-cell">
                  {fav.occupation}
                </td>
                <td className="p-4 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <Link
                      to={`/biodata/${fav._id}`}
                      className="p-2 rounded-full text-txt/70 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      title="View Biodata"
                    >
                      <HiOutlineEye className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(fav._id, fav.name)}
                      disabled={isRemoving}
                      className="p-2 rounded-full text-txt/70 dark:text-gray-400 hover:bg-accent/10 dark:hover:bg-accent/20 hover:text-accent dark:hover:text-accent transition-colors disabled:cursor-not-allowed"
                      title="Delete Favourite"
                    >
                      <HiOutlineTrash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFavouritesList;
