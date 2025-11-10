import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAxios from "../Hooks/useAxios";
import Loader from "../Components/Loader";
import EachCrops from "../Components/EachCrops";

const AllCropsPage = () => {
  const [allCrops, setAllCrops] = useState([]);
  const [search, setSearch] = useState("");
  const { loading, setLoading } = useContext(AuthContext);
  const instance = useAxios();

  useEffect(() => {
    const fetchAllCrops = async () => {
      setLoading(true);
      try {
        const res = await instance.get(`/allCrops`);

        setAllCrops(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCrops();
  }, [instance, setLoading]);

  const finalSearch = search.trim().toLowerCase();
  const searchApps = finalSearch
    ? allCrops.filter((crops) => crops.name.toLowerCase().includes(finalSearch))
    : allCrops;

  return (
    <div className="mt-30">
      <h1 className="font-bold text-4xl text-center mb-5 text-lime-500">
        All Crops
      </h1>
      <div className="flex justify-between">
        <div></div>
        <div className="pr-5 md:w-[20%] mt-5">
          <label className="input w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              type="search"
              placeholder="Search"
            />
          </label>
        </div>
      </div>
      {
        searchApps.length === 0 && <h1 className="text-center text-2xl text-gray-400 font-semibold">No Product Found</h1>
      }
      {loading ? (
        <Loader />
      ) : (
        <div className="w-[95%] grid grid-cols-2 md:grid-cols-3 mx-auto gap-5 my-10">
          {searchApps.map((crops) => (
            <EachCrops key={crops._id} crops={crops}></EachCrops>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCropsPage;
