import { useContext, useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router";
import Loader from "./Loader";
import { motion } from "framer-motion";
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
  const [allCrops, setAllCrops] = useState([]);
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

  // All fetch id wise filter (kept as your current approach)
  useEffect(() => {
    const fetchCrop = async () => {
      setLoading(true);
      try {
        const res = await instance.get(`/allCrops`);
        setAllCrops(res.data);
        const filterCrop = res.data.find((crop) => crop._id === id);
        setCrops(filterCrop);
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

  // ✅ NEW: Load interests from interests collection via API (only owner can access)
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

  // ✅ NEW: “received interest count” (simple: just for this crop now)
  // If you want total across all crops later, we’ll move this to dashboard API.
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

    // ✅ NEW payload (backend takes buyer identity from token)
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
          payload
        );

        if (res.data.success) {
          toast.success("Interest submitted successfully!");
          setShowForm(false);
          setQuantity(1);
          setMessage("");
          // No optimistic update needed here because buyers can’t view owner-only list.
        } else {
          toast.error(
            res.data.message || "Submission failed, Try again later."
          );
        }
      } catch (error) {
        const msg = error?.response?.data?.message;
        if (msg?.includes("already") || error?.response?.status === 409) {
          toast.error("You’ve already sent an interest for this crop.");
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
      return "text-[var(--color-primary)] bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] border-[color-mix(in_srgb,var(--color-primary)_25%,transparent)]";
    if (s === "rejected")
      return "text-red-600 bg-red-50 dark:text-red-300 dark:bg-red-900/20 border-red-200 dark:border-red-900/40";
    return "text-[var(--color-secondary)] bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)] border-[color-mix(in_srgb,var(--color-accent)_30%,transparent)]";
  };

  return (
    <div className="bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-6 text-[var(--color-text)]">
          Product <span className="text-[var(--color-primary)]">Details</span>
        </h1>

        {loading ? (
          <CropsDetailsSkeleton interestRows={4} />
        ) : (
          <div className="mt-10 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-2xl">
            {/* Image Section */}
            <motion.div
              className="md:w-1/2 bg-[var(--color-bg)]"
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
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-2">
                  <span className="text-[var(--color-primary)]">
                    {crops.name}
                  </span>
                </h1>

                <p className="text-[var(--color-muted)] text-sm sm:text-base mb-4 leading-relaxed">
                  {crops.description}
                </p>

                <div className="space-y-2 text-sm sm:text-base">
                  <p className="text-[var(--color-text)]">
                    <span className="font-semibold text-[var(--color-secondary)]">
                      Type:
                    </span>{" "}
                    <span className="text-[var(--color-text)]/90">
                      {crops.type}
                    </span>
                  </p>

                  <p className="text-[var(--color-text)]">
                    <span className="font-semibold text-[var(--color-secondary)]">
                      Price:
                    </span>{" "}
                    <span className="text-[var(--color-primary)] font-semibold">
                      {crops.pricePerUnit} BDT/{crops.unit}
                    </span>
                  </p>

                  <p className="text-[var(--color-text)]">
                    <span className="font-semibold text-[var(--color-secondary)]">
                      Quantity:
                    </span>{" "}
                    <span className="text-[var(--color-text)]/90">
                      {crops.quantity} {crops.unit}
                    </span>
                  </p>

                  <p className="text-[var(--color-text)]">
                    <span className="font-semibold text-[var(--color-secondary)]">
                      Location:
                    </span>{" "}
                    <span className="text-[var(--color-text)]/90">
                      {crops.location}
                    </span>
                  </p>
                </div>
              </div>

              {/* Owner Info */}
              <div className="mt-6 border-t border-[var(--color-border)] pt-4">
                <h2 className="text-base sm:text-lg font-semibold text-[var(--color-text)] mb-2">
                  Owner Information
                </h2>
                <p className="text-sm sm:text-base text-[var(--color-text)]/90">
                  <span className="font-medium text-[var(--color-secondary)]">
                    Name:
                  </span>{" "}
                  {crops.owner?.ownerName}
                </p>
                <p className="text-sm sm:text-base text-[var(--color-text)]/90">
                  <span className="font-medium text-[var(--color-secondary)]">
                    Email:
                  </span>{" "}
                  {crops.owner?.ownerEmail}
                </p>
              </div>

              {userEmail === cropOwnerEmail && (
                <div className="mt-6 border-t border-[var(--color-border)] pt-4">
                  <h1 className="font-semibold text-sm sm:text-base text-[var(--color-muted)]">
                    Interests received for this crop:{" "}
                    <span className="text-[var(--color-text)]">
                      {interestCrops}
                    </span>
                  </h1>
                </div>
              )}

              {/* Button Section */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                {userEmail === cropOwnerEmail ? (
                  <Link to="/receiveInterest" className="flex-1">
                    <button className="w-full px-5 py-2.5 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:brightness-95 transition">
                      Manage received interests
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={() => setShowForm(true)}
                    className="flex-1 px-5 py-2.5 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:brightness-95 transition"
                  >
                    Show Interest
                  </button>
                )}

                <button
                  onClick={() => window.history.back()}
                  className="flex-1 px-5 py-2.5 border border-[var(--color-secondary)] text-[var(--color-secondary)] font-semibold rounded-lg hover:bg-[color-mix(in_srgb,var(--color-secondary)_10%,transparent)] transition"
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
              <div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center">
                <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl text-[var(--color-text)]">
                  People who are interested in this product
                </h1>
                <p className="text-base sm:text-lg text-[var(--color-muted)] font-semibold">
                  No one has shown any interest yet!
                </p>
              </div>
            ) : null}

            {userEmail === cropOwnerEmail && interestData.length > 0 ? (
              <div className="w-full mx-auto my-8 bg-[var(--color-surface)] rounded-2xl shadow-sm border border-[var(--color-border)] overflow-hidden">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-[var(--color-bg)] border-b border-[var(--color-border)]">
                    <tr className="text-[var(--color-text)]">
                      <th className="py-3 px-4 font-semibold">SL No</th>
                      <th className="py-3 px-4 font-semibold">Wants to buy</th>
                      <th className="py-3 px-4 font-semibold">Quantity</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                    </tr>
                  </thead>

                  <tbody className="text-[var(--color-text)]/90">
                    {interestData.map((interest, index) => (
                      <tr
                        key={interest._id || index}
                        className="border-b border-[var(--color-border)] hover:bg-[color-mix(in_srgb,var(--color-primary)_6%,transparent)] transition"
                      >
                        <td className="py-3 px-4">{index + 1}</td>

                        <td className="py-3 px-4">
                          <div>
                            <p className="font-semibold text-[var(--color-text)]">
                              {interest.buyerName ||
                                interest.userName ||
                                "Unknown"}
                            </p>
                            <p className="text-xs text-[var(--color-muted)]">
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
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-[var(--color-text)]/80">
            Similar types of products
          </h1>

          {typeLoading ? (
            <SimilarProductsSkeleton count={4} />
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
                  <h1 className="font-semibold text-base sm:text-lg text-[var(--color-muted)]">
                    There are no product of this type.
                  </h1>
                )}
              </Swiper>
            </div>
          )}
        </div>

        {/* Interest Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-2xl shadow-lg w-full max-w-md relative">
              <h2 className="text-xl sm:text-2xl font-semibold text-[var(--color-text)] mb-4">
                Express Your Interest
              </h2>

              <label className="block mb-3">
                <span className="text-[var(--color-muted)] font-medium text-sm sm:text-base">
                  Quantity ({crops.unit})
                </span>
                <input
                  type="text"
                  defaultValue={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="mt-1 w-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] rounded-lg px-3 py-2 focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
                />
              </label>

              <label className="block mb-3">
                <span className="text-[var(--color-muted)] font-medium text-sm sm:text-base">
                  Message
                </span>
                <textarea
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 w-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] rounded-lg px-3 py-2 focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
                  placeholder="Example: Interested in buying 100kg..."
                ></textarea>
              </label>

              <div className="mb-4">
                <p className="text-[var(--color-muted)] font-medium text-sm sm:text-base">
                  Total Price:{" "}
                  <span className="text-[var(--color-primary)] font-semibold">
                    {totalPrice.toLocaleString()} BDT
                  </span>
                </p>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-[var(--color-border)] text-[var(--color-text)] rounded-lg hover:bg-[var(--color-bg)] transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleInterestSubmit}
                  className="px-4 py-2 bg-[var(--color-primary)] hover:brightness-95 text-white rounded-lg font-semibold transition"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropsDetails;
