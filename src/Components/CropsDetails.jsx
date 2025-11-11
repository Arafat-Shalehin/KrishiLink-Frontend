import { useContext, useState } from "react";
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
import { AuthContext } from "../Context/AuthProvider";
import { toast } from "react-toastify";

const CropsDetails = () => {
  const { id, type } = useParams();
  // console.log(id, type);
  const instance = useAxios();
  const { user } = useContext(AuthContext);
  console.log(user);
  const [crops, setCrops] = useState([]);
  const [sameType, setSameType] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typeLoading, setTypeLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [interestData, setInterestData] = useState([]);

  // ID wise fetch
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

  // Type wise fetch
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

  // Form price
  useEffect(() => {
    if (crops?.pricePerUnit) {
      setTotalPrice(quantity * crops.pricePerUnit);
    }
  }, [quantity, crops]);

  // Interested product
  useEffect(() => {
    setInterestData(crops?.interests || []);
  }, [crops]);

  console.log(crops);
  console.log(interestData);

  // Identifying user and owner
  const userName = user?.displayName;
  const userEmail = user?.email;
  console.log({ userName, userEmail });

  const cropOwnerName = crops?.owner?.ownerName;
  const cropOwnerEmail = crops?.owner?.ownerEmail;
  console.log({ cropOwnerName, cropOwnerEmail });

  // Handle Interest Function
  const handleInterestSubmit = async () => {
    if (quantity < 1) return toast.error("Quantity must be at least 1.");

    const interestData = {
      userEmail,
      userName,
      quantity,
      message,
    };

    try {
      const res = await instance.post(
        `/allCrops/${crops._id}/interests`,
        interestData
      );

      if (res.data.success) {
        toast.success("Interest submitted successfully!");
        setShowForm(false);
        setQuantity(1);
        setMessage("");
        setInterestData((prev) => [
          ...prev,
          {
            userEmail,
            userName,
            quantity,
            message,
            status: "pending",
          },
        ]);
      } else {
        toast.error(res.data.message || "Submission failed, Try again later.");
      }
    } catch (error) {
      if (error.response?.data?.message?.includes("already sent")) {
        toast.error("You’ve already sent an interest for this crop.");
        setShowForm(false);
      } else {
        toast.error("Error submitting interest.");
      }
    }
  };

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
              {userName === cropOwnerName && userEmail === cropOwnerEmail ? (
                <button className="flex-1 px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
                  Manage received interests
                </button>
              ) : (
                <button
                  onClick={() => setShowForm(true)}
                  className="flex-1 px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                >
                  Show Interest
                </button>
              )}

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

      {/* Interested Prople */}
      <div className="mt-20">
        <h1 className="font-semibold md:text-3xl text-2xl text-gray-900/70">
          People who are interested in this product
        </h1>
        {loading ? (
          <Loader />
        ) : (
          <>
            {interestData.length === 0 ? (
              <h1 className="text-center mt-20 text-lg">
                No one has shown any interest yet!
              </h1>
            ) : (
              <div className="w-full mx-auto my-10 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full md:px-15 text-left text-sm text-gray-700">
                  <thead className="bg-gray-50 border-b border-[#E9E9E9]">
                    <tr>
                      <th className="py-3 px-4 font-medium">SL No</th>
                      {/* <th className="py-3 px-4 font-medium">Product</th> */}
                      <th className="py-3 px-4 font-medium">Wants to buy</th>
                      <th className="py-3 px-4 font-medium">Quantity</th>
                      <th className="py-3 px-4 font-medium">Status</th>
                      {/* <th className="py-3 px-4 font-medium text-center">
                        Actions
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {interestData.map((interest, index) => (
                      <tr
                        key={index}
                        className="border-b border-[#E9E9E9] hover:bg-gray-50 transition"
                      >
                        <td className="py-3 px-4">{index + 1}</td>

                        {/* Buyers Info */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="font-semibold text-gray-800">
                                {interest.userName}
                              </p>
                              <p className="text-xs text-gray-500">
                                {interest.userEmail}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* interest Price */}
                        <td className="py-3 px-4 font-semibold">
                          ${interest.quantity}
                        </td>

                        {/* Status */}
                        <td className="py-3 px-4 font-semibold">
                          ${interest.status}
                        </td>

                        {/* Actions */}
                        {/* <td className="py-3 px-4 text-center">
                          <button
                            // onClick={() => handleDeleteBid(bid._id)}
                            className="ml-2 px-3 py-1.5 rounded-md text-sm font-medium border border-red-400 text-red-500 hover:bg-red-50 transition"
                          >
                            Remove Interest
                          </button>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {/* Similar Type of Products */}
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
              {sameType.length > 0 ? (
                sameType.map((crops) => (
                  <SwiperSlide key={crops._id}>
                    <EachCrops crops={crops} />
                  </SwiperSlide>
                ))
              ) : (
                <h1 className="font-semibold text-xl">
                  There are no product of this type.
                </h1>
              )}
            </Swiper>
          </div>
        )}
      </div>

      {/* Interest Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] md:w-[450px] relative">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Express Your Interest
            </h2>

            {/* Quantity Field */}
            <label className="block mb-3">
              <span className="text-gray-700 font-medium">
                Quantity ({crops.unit})
              </span>
              <input
                type="text"
                // min="1"
                defaultValue={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </label>

            {/* Message Field */}
            <label className="block mb-3">
              <span className="text-gray-700 font-medium">Message</span>
              <textarea
                rows="3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Example: Interested in buying 100kg..."
              ></textarea>
            </label>

            {/* Auto-calculated Price */}
            <div className="mb-4">
              <p className="text-gray-700 font-medium">
                Total Price:{" "}
                <span className="text-green-600 font-semibold">
                  {totalPrice.toLocaleString()} BDT
                </span>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleInterestSubmit()}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropsDetails;
