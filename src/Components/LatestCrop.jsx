import React from "react";
import { Link } from "react-router";

const LatestCrop = () => {
  return (
    <div className="text-center my-8">
      <h1 className="text-green-900/60 text-4xl font-bold mb-10">
        Latest Crop Post
      </h1>
      <div>{}</div>
      <Link to="/all-crops">
        <button
          className="bg-linear-to-r from-green-700 
          to-green-500 font-semibold text-lg px-8 lg:px-13 py-2 rounded text-white/90 mt-10"
        >
          View All
        </button>
      </Link>
    </div>
  );
};

export default LatestCrop;
