import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import usePublicAxios from "../../../../Hook/usePublicAxios";
import SuccessDetailSection from "./SuccessDetailSection/SuccessDetailSection";

const SuccessStoriesDetails = () => {
  // Extracting the ID from the URL parameters
  const { id } = useParams();
  const axiosPublic = usePublicAxios();

  const {
    data: story,
    isloading,
    isError,
  } = useQuery({
    queryKey: ["successStory", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/success-stories/${id}`);
      return data.data;
    },
  });
  return (
    <div>
      {isloading && <p>Loading...</p>}
      <SuccessDetailSection story={story} />
    </div>
  );
};

export default SuccessStoriesDetails;
