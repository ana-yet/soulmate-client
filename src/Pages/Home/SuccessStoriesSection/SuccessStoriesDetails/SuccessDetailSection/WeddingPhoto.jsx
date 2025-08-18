import React from "react";

const WeddingPhoto = ({ photo, index }) => {
  return (
    <div
      key={index}
      className="rounded-lg overflow-hidden border border-secondary/20 dark:border-dark-border hover:shadow-lg transition-all duration-300"
    >
      <img
        src={photo}
        alt={`Wedding photo ${index + 1}`}
        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
      />
    </div>
  );
};

export default WeddingPhoto;
