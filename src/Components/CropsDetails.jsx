import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import useAxios from "../Hooks/useAxios";
import Loader from "./Loader";
import { motion } from "framer-motion";
import EachCrops from "./EachCrops";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
// import required modules
import { Scrollbar } from "swiper/modules";

const CropsDetails = () => {
  const { id, type } = useParams();
  // console.log(id, type);
  const instance = useAxios();
  const [crops, setCrops] = useState([]);
  const [sameType, setSameType] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typeLoading, setTypeLoading] = useState(false);

  useEffect(() => {
    const fetchCrop = async () => {
      setLoading(true);
      try {
        const res = await instance.get(`/allCrops/${id}`);
        setCrops(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrop();
  }, [instance, id]);

  useEffect(() => {
    const fetchAllCrops = async () => {
      setTypeLoading(true);
      try {
        const res = await instance.get(`/allCrops`);

        // Filter after fetching
        const sT = res.data.filter(
          (crop) => crop.type === type && crop._id !== id
        );
        setSameType(sT);
      } catch (error) {
        console.error(error);
      } finally {
        setTypeLoading(false);
      }
    };

    fetchAllCrops();
  }, [instance, type, id]);

  // console.log(crops);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-15">
      <h1 className="font-bold text-4xl text-center mb-5 text-lime-500">
        Product Details
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-2xl">
          {/* Image Section */}
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src={crops.image}
              alt={crops.name}
              className="h-full w-full object-cover md:rounded-l-2xl"
            />
          </motion.div>

          {/* Details Section */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-green-700 mb-2">
                {crops.name}
              </h1>
              <p className="text-gray-600 mb-4">{crops.description}</p>

              <div className="space-y-2">
                <p>
                  <span className="font-semibold text-gray-800">Type: </span>
                  {crops.type}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">Price: </span>
                  <span className="text-green-700 font-semibold">
                    {crops.pricePerUnit} BDT/{crops.unit}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-gray-800">
                    Quantity:{" "}
                  </span>
                  {crops.quantity} {crops.unit}
                </p>
                <p>
                  <span className="font-semibold text-gray-800">
                    Location:{" "}
                  </span>
                  {crops.location}
                </p>
              </div>
            </div>

            {/* Owner Info */}
            <div className="mt-6 border-t pt-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Owner Information
              </h2>
              <p>
                <span className="font-medium">Name: </span>
                {crops.owner?.ownerName}
              </p>
              <p>
                <span className="font-medium">Email: </span>
                {crops.owner?.ownerEmail}
              </p>
            </div>

            {/* Button Section */}
            <div className="mt-6 flex gap-3">
              <button className="flex-1 px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
                Show Interest
              </button>
              <button
                onClick={() => window.history.back()}
                className="flex-1 px-5 py-2 border border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-20">
        <h1 className="font-bold text-4xl text-gray-400">
          Similar types of products
        </h1>
        {typeLoading ? (
          <Loader />
        ) : (
          <div className="mt-5 mb-5">
            <Swiper
              lazy="true"
              slidesPerView={2}
              spaceBetween={20}
              scrollbar={{
                hide: true,
              }}
              modules={[Scrollbar]}
              className="mySwiper"
            >
              {sameType.map((crops) => (
                <SwiperSlide key={crops._id}>
                  <EachCrops crops={crops} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropsDetails;
