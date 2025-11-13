import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxios from "../Hooks/useAxios";
import EachCrops from "./EachCrops";
import Loader from "./Loader";

const LatestCrop = () => {
  const [sixCrops, setSixCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const instance = useAxios();

  useEffect(() => {
    setLoading(true);
    instance
      .get("/sixCrops")
      .then((res) => {
        setSixCrops(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [instance]);

  return (
    <div className="text-center my-8">
      <h1 className="text-green-900/60 text-4xl font-bold mb-10">
        Latest Crop Post
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-[95%] grid grid-cols-2 md:grid-cols-3 mx-auto gap-5">
          {sixCrops.map((crops) => {
            return <EachCrops key={crops._id} crops={crops}></EachCrops>;
          })}
        </div>
      )}
      <Link to="/all-crops">
        <button
          className="border border-green-400 font-semibold 
          text-lg lg:px-12 px-7 py-1.5 rounded 
          text-green-600/90 mt-10 hover:bg-green-300/20 
          transition-colors"
        >
          View All
        </button>
      </Link>
    </div>
  );
};

export default LatestCrop;
