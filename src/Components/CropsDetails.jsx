import { useContext, useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router";
import Loader from "./Loader";
import { motion, AnimatePresence } from "framer-motion";
import EachCrops from "./EachCrops";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import { AuthContext } from "../Context/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import CropsDetailsSkeleton from "./Skeleton/CropsDetailsSkeleton";
import SimilarProductsSkeleton from "./Skeleton/SimilarProductsSkeleton";
import useAxiosSecure from "../Hooks/useAxios";

const CropsDetails = () => {
  const { id, type } = useParams();
  const instance = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [crops, setCrops] = useState([]);
  const [interestCrops, setInterestCrops] = useState(0);

  const [sameType, setSameType] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typeLoading, setTypeLoading] = useState(false);

  const [interestsLoading, setInterestsLoading] = useState(false);
  const [interestData, setInterestData] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const userEmail = user?.email;
  const cropOwnerEmail = crops?.owner?.ownerEmail;

  // ✅ FIXED: Fetch single crop by ID (using direct endpoint)
  useEffect(() => {
    const fetchCrop = async () => {
      setLoading(true);
      try {
        // ✅ Use direct endpoint instead of fetching all and filtering
        const res = await instance.get(`/allCrops/${id}`);
        setCrops(res.data); // This endpoint returns the crop object directly
      } catch (error) {
        console.error("Error fetching crop:", error);
        toast.error("Failed to load crop details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCrop();
    }
  }, [instance, id]);

  // ✅ FIXED: Fetch similar products by type
  useEffect(() => {
    const fetchSimilarCrops = async () => {
      setTypeLoading(true);
      try {
        // ✅ Use the new filter endpoint
        const res = await instance.get(
          `/allCrops?type=${encodeURIComponent(type)}&limit=10`,
        );

        // ✅ Access crops array from response object
        const cropsData = res.data.crops || [];

        // Filter out the current crop
        const similarCrops = cropsData.filter((crop) => crop._id !== id);
        setSameType(similarCrops);
      } catch (error) {
        console.error("Error fetching similar crops:", error);
        setSameType([]);
      } finally {
        setTypeLoading(false);
      }
    };

    if (type) {
      fetchSimilarCrops();
    }
  }, [instance, type, id]);

  // Form price
  useEffect(() => {
    if (crops?.pricePerUnit) {
      setTotalPrice(quantity * crops.pricePerUnit);
    }
  }, [quantity, crops]);

  // ✅ Load interests from interests collection via API (only owner can access)
  useEffect(() => {
    const fetchInterestsForCrop = async () => {
      // If user not logged in or not owner, don't fetch (route is farmer-owner protected)
      if (!userEmail || !crops?._id) {
        setInterestData([]);
        return;
      }

      if (userEmail !== cropOwnerEmail) {
        setInterestData([]);
        return;
      }

      try {
        setInterestsLoading(true);
        const res = await instance.get(`/allCrops/${crops._id}/interests`);
        setInterestData(res.data?.interests || []);
      } catch (err) {
        console.error(err);
        setInterestData([]);
      } finally {
        setInterestsLoading(false);
      }
    };

    fetchInterestsForCrop();
  }, [instance, crops?._id, userEmail, cropOwnerEmail]);

  // ✅ "received interest count" (simple: just for this crop now)
  useEffect(() => {
    if (userEmail === cropOwnerEmail) {
      setInterestCrops(interestData.length);
    } else {
      setInterestCrops(0);
    }
  }, [interestData, userEmail, cropOwnerEmail]);

  // Handle Interest Function (buyer sends interest)
  const handleInterestSubmit = async () => {
    const qty = Number(quantity);
    if (!qty || qty < 1) return toast.error("Quantity must be at least 1.");

    // ✅ payload (backend takes buyer identity from token)
    const payload = { quantity: qty, message };

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });

    if (result.isConfirmed) {
      try {
        const res = await instance.post(
          `/allCrops/${crops._id}/interests`,
          payload,
        );

        if (res.data.success) {
          toast.success("Interest submitted successfully!");
          setShowForm(false);
          setQuantity(1);
          setMessage("");
        } else {
          toast.error(
            res.data.message || "Submission failed, Try again later.",
          );
        }
      } catch (error) {
        const msg = error?.response?.data?.message;
        if (msg?.includes("already") || error?.response?.status === 409) {
          toast.error("You've already sent an interest for this crop.");
          setShowForm(false);
        } else {
          toast.error(msg || "Error submitting interest.");
        }
      }
    }
  };

  const statusClass = (status) => {
    const s = String(status || "").toLowerCase();
    if (s === "accepted")
      return "text-(--color-primary) bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] border-[color-mix(in_srgb,var(--color-primary)_25%,transparent)]";
    if (s === "rejected")
      return "text-red-600 bg-red-50 dark:text-red-300 dark:bg-red-900/20 border-red-200 dark:border-red-900/40";
    return "text-(--color-secondary) bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)] border-[color-mix(in_srgb,var(--color-accent)_30%,transparent)]";
  };

  return (
    <div className="bg-(--color-bg) text-(--color-text)">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-6 text-(--color-text)">
          Product <span className="text-(--color-primary)">Details</span>
        </h1>

        {loading ? (
          <CropsDetailsSkeleton interestRows={4} />
        ) : (
          <div className="mt-10 bg-(--color-surface) border border-(--color-border) shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-2xl">
            {/* Image Section */}
            <motion.div
              className="md:w-1/2 bg-(--color-bg)"
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
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-(--color-text) mb-2">
                  <span className="text-(--color-primary)">{crops.name}</span>
                </h1>

                <p className="text-(--color-muted) text-sm sm:text-base mb-4 leading-relaxed">
                  {crops.description}
                </p>

                <div className="space-y-2 text-sm sm:text-base">
                  <p className="text-(--color-text)">
                    <span className="font-semibold text-(--color-secondary)">
                      Type:
                    </span>{" "}
                    <span className="text-(--color-text)/90">{crops.type}</span>
                  </p>

                  <p className="text-(--color-text)">
                    <span className="font-semibold text-(--color-secondary)">
                      Price:
                    </span>{" "}
                    <span className="text-(--color-primary) font-semibold">
                      {crops.pricePerUnit} BDT/{crops.unit}
                    </span>
                  </p>

                  <p className="text-(--color-text)">
                    <span className="font-semibold text-(--color-secondary)">
                      Quantity:
                    </span>{" "}
                    <span className="text-(--color-text)/90">
                      {crops.quantity} {crops.unit}
                    </span>
                  </p>

                  <p className="text-(--color-text)">
                    <span className="font-semibold text-(--color-secondary)">
                      Location:
                    </span>{" "}
                    <span className="text-(--color-text)/90">
                      {crops.location}
                    </span>
                  </p>
                </div>
              </div>

              {/* Owner Info */}
              <div className="mt-6 border-t border-(--color-border) pt-4">
                <h2 className="text-base sm:text-lg font-semibold text-(--color-text) mb-2">
                  Owner Information
                </h2>
                <p className="text-sm sm:text-base text-(--color-text)/90">
                  <span className="font-medium text-(--color-secondary)">
                    Name:
                  </span>{" "}
                  {crops.owner?.ownerName}
                </p>
                <p className="text-sm sm:text-base text-(--color-text)/90">
                  <span className="font-medium text-(--color-secondary)">
                    Email:
                  </span>{" "}
                  {crops.owner?.ownerEmail}
                </p>
              </div>

              {userEmail === cropOwnerEmail && (
                <div className="mt-6 border-t border-(--color-border) pt-4">
                  <h1 className="font-semibold text-sm sm:text-base text-(--color-muted)">
                    Interests received for this crop:{" "}
                    <span className="text-(--color-text)">{interestCrops}</span>
                  </h1>
                </div>
              )}

              {/* Button Section */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                {userEmail === cropOwnerEmail ? (
                  <Link to="/dashboard/farmer/interests" className="flex-1">
                    <button className="w-full px-5 py-2.5 bg-(--color-primary) text-white font-semibold rounded-lg hover:brightness-95 transition">
                      Manage received interests
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={() => setShowForm(true)}
                    className="flex-1 px-5 py-2.5 bg-(--color-primary) text-white font-semibold rounded-lg hover:brightness-95 transition"
                  >
                    Show Interest
                  </button>
                )}

                <button
                  onClick={() => window.history.back()}
                  className="flex-1 px-5 py-2.5 border border-(--color-secondary) text-(--color-secondary) font-semibold rounded-lg hover:bg-[color-mix(in_srgb,var(--color-secondary)_10%,transparent)] transition"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Interested People */}
        {interestsLoading ? (
          <Loader />
        ) : (
          <>
            {userEmail === cropOwnerEmail && interestData.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-(--color-border) bg-(--color-surface) p-10 text-center">
                <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl text-(--color-text)">
                  People who are interested in this product
                </h1>
                <p className="text-base sm:text-lg text-(--color-muted) font-semibold">
                  No one has shown any interest yet!
                </p>
              </div>
            ) : null}

            {userEmail === cropOwnerEmail && interestData.length > 0 ? (
              <div className="w-full mx-auto my-8 bg-(--color-surface) rounded-2xl shadow-sm border border-(--color-border) overflow-hidden">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-(--color-bg) border-b border-(--color-border)">
                    <tr className="text-(--color-text)">
                      <th className="py-3 px-4 font-semibold">SL No</th>
                      <th className="py-3 px-4 font-semibold">Wants to buy</th>
                      <th className="py-3 px-4 font-semibold">Quantity</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                    </tr>
                  </thead>

                  <tbody className="text-(--color-text)/90">
                    {interestData.map((interest, index) => (
                      <tr
                        key={interest._id || index}
                        className="border-b border-(--color-border) hover:bg-[color-mix(in_srgb,var(--color-primary)_6%,transparent)] transition"
                      >
                        <td className="py-3 px-4">{index + 1}</td>

                        <td className="py-3 px-4">
                          <div>
                            <p className="font-semibold text-(--color-text)">
                              {interest.buyerName ||
                                interest.userName ||
                                "Unknown"}
                            </p>
                            <p className="text-xs text-(--color-muted)">
                              {interest.buyerEmail || interest.userEmail || "—"}
                            </p>
                          </div>
                        </td>

                        <td className="py-3 px-4 font-semibold">
                          {interest.quantity} {crops.unit}
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={[
                              "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize",
                              statusClass(interest.status),
                            ].join(" ")}
                          >
                            {interest.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </>
        )}

        {/* Similar Type of Products */}
        <div className="mt-16 sm:mt-20">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-(--color-text)/80">
            Similar types of products
          </h1>

          {typeLoading ? (
            <SimilarProductsSkeleton count={2} />
          ) : (
            <div className="mt-5 mb-5">
              <Swiper
                lazy="true"
                slidesPerView={2}
                spaceBetween={20}
                scrollbar={{ hide: true }}
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
                  <h1 className="font-semibold text-base sm:text-lg text-(--color-muted)">
                    There are no product of this type.
                  </h1>
                )}
              </Swiper>
            </div>
          )}
        </div>

        {/* Interest Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              /* ── Backdrop animation ── */
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 backdrop-blur-sm"
            >
              <motion.div
                /* ── Modal Content animation ── */
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-(--color-surface) border border-(--color-border) p-6 rounded-2xl shadow-lg w-full max-w-md relative"
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-(--color-text) mb-4">
                  Express Your Interest
                </h2>

                <label className="block mb-3">
                  <span className="text-(--color-muted) font-medium text-sm sm:text-base">
                    Quantity ({crops.unit})
                  </span>
                  <input
                    type="text"
                    defaultValue={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="mt-1 w-full border border-(--color-border) bg-(--color-surface) text-(--color-text) rounded-lg px-3 py-2 focus:outline-none focus:ring-4 focus:ring-(--color-primary)/20"
                  />
                </label>

                <label className="block mb-3">
                  <span className="text-(--color-muted) font-medium text-sm sm:text-base">
                    Message
                  </span>
                  <textarea
                    rows="3"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-1 w-full border border-(--color-border) bg-(--color-surface) text-(--color-text) rounded-lg px-3 py-2 focus:outline-none focus:ring-4 focus:ring-(--color-primary)/20"
                    placeholder="Example: Interested in buying 100kg..."
                  ></textarea>
                </label>

                <div className="mb-4">
                  <p className="text-(--color-muted) font-medium text-sm sm:text-base">
                    Total Price:{" "}
                    <span className="text-(--color-primary) font-semibold">
                      {totalPrice.toLocaleString()} BDT
                    </span>
                  </p>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border border-(--color-border) text-(--color-text) rounded-lg hover:bg-(--color-bg) transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleInterestSubmit}
                    className="px-4 py-2 bg-(--color-primary) hover:brightness-95 text-white rounded-lg font-semibold transition"
                  >
                    Submit
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CropsDetails;
