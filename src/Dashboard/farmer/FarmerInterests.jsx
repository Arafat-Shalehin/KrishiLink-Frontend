import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosSecure from "@/Hooks/useAxios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Loader from "@/Components/Loader";
import FarmerInterestsSkeleton from "./FarmerInterestsSkeleton";

const FarmerInterests = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const instance = useAxiosSecure();

  const [receivedInterests, setReceivedInterests] = useState([]);
  const [loadingInterestId, setLoadingInterestId] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchReceivedInterests = async () => {
      setPageLoading(true);
      try {
        // ✅ farmer-only secured endpoint (no email query needed)
        const cropsRes = await instance.get("/myCrops");
        const myCrops = cropsRes.data?.crops || [];

        // fetch interests per crop (owner-only secured endpoint)
        const interestLists = await Promise.all(
          myCrops.map(async (crop) => {
            try {
              const res = await instance.get(`/allCrops/${crop._id}/interests`);
              const interests = res.data?.interests || [];

              return interests.map((interest) => ({
                cropId: crop._id,
                cropName: crop.name,
                buyerName: interest.buyerName || interest.userName,
                buyerEmail: interest.buyerEmail || interest.userEmail,
                quantity: interest.quantity,
                message: interest.message,
                status: interest.status,
                interestId: interest._id,
                cropQuantity: crop.quantity,
              }));
            } catch (err) {
              // if a crop has no interests or request fails, just ignore it
              return [];
            }
          }),
        );

        const flat = interestLists.flat();
        setReceivedInterests(flat);
      } catch (error) {
        console.error("Error loading received interests:", error);
        toast.error(
          error.response?.data?.message || "Failed to load received interests.",
        );
      } finally {
        setPageLoading(false);
      }
    };

    fetchReceivedInterests();
  }, [instance, user?.email]);

  const handleStatusChange = async (cropId, interestId, newStatus) => {
    try {
      setLoadingInterestId(interestId);

      const res = await instance.patch(
        `/updateInterestStatus/${cropId}/${interestId}`,
        { status: newStatus },
      );

      toast.success(res.data.message);

      setReceivedInterests((prev) =>
        prev.map((interest) =>
          interest.interestId === interestId
            ? {
                ...interest,
                status: newStatus,
                ...(newStatus === "accepted" &&
                res.data.newQuantity !== undefined
                  ? { cropQuantity: res.data.newQuantity }
                  : {}),
              }
            : interest,
        ),
      );
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update status");
    } finally {
      setLoadingInterestId(null);
    }
  };

  if (authLoading || pageLoading) return <FarmerInterestsSkeleton rows={6} />;

  return (
    <motion.div
      className="mt-12 rounded-2xl border border-(--color-border) bg-(--color-surface) shadow-xl p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="mt-6 text-2xl sm:text-3xl font-bold mb-6 text-(--color-text) text-center">
        Received <span className="text-(--color-primary)">Interests</span>
      </h3>

      {receivedInterests.length === 0 ? (
        <p className="text-center text-(--color-muted) italic">
          No interest requests received yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-xl border border-(--color-border) overflow-hidden">
            <thead className="bg-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-bg)) text-(--color-text)">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Crop</th>
                <th className="px-4 py-3 text-left font-semibold">Buyer</th>
                <th className="px-4 py-3 text-left font-semibold">Quantity</th>
                <th className="px-4 py-3 text-left font-semibold">Message</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {receivedInterests.map((interest) => (
                <motion.tr
                  key={interest.interestId}
                  className="border-t border-(--color-border) hover:bg-[color-mix(in_srgb,var(--color-primary)_6%,transparent) transition duration-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <td className="px-4 py-3 font-semibold text-(--color-text)">
                    {interest.cropName}
                  </td>

                  <td className="px-4 py-3">
                    <p className="font-semibold text-(--color-text)">
                      {interest.buyerName || "Unknown"}
                    </p>
                    <p className="text-xs text-(--color-muted)">
                      {interest.buyerEmail || "—"}
                    </p>
                  </td>

                  <td className="px-4 py-3 font-semibold text-(--color-text)/90">
                    {interest.quantity}
                  </td>

                  <td className="px-4 py-3 text-(--color-text)/90">
                    {interest.message || "—"}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={[
                        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold capitalize",
                        interest.status === "accepted"
                          ? "border-[color-mix(in_srgb,var(--color-primary)_30%,transparent) bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent) text-(--color-primary)"
                          : interest.status === "rejected"
                            ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300"
                            : "border-[color-mix(in_srgb,var(--color-accent)_30%,transparent) bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent) text-(--color-secondary)",
                      ].join(" ")}
                    >
                      {interest.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 space-x-2">
                    <button
                      disabled={
                        interest.status !== "pending" ||
                        loadingInterestId === interest.interestId
                      }
                      onClick={() =>
                        handleStatusChange(
                          interest.cropId,
                          interest.interestId,
                          "accepted",
                        )
                      }
                      className="rounded-lg border border-(--color-primary) px-3 py-1.5 text-sm font-semibold text-(--color-primary)
                      hover:bg-(--color-primary) hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loadingInterestId === interest.interestId
                        ? "..."
                        : "Accept"}
                    </button>

                    <button
                      disabled={
                        interest.status !== "pending" ||
                        loadingInterestId === interest.interestId
                      }
                      onClick={() =>
                        handleStatusChange(
                          interest.cropId,
                          interest.interestId,
                          "rejected",
                        )
                      }
                      className="rounded-lg border border-red-500 px-3 py-1.5 text-sm font-semibold text-red-600
                      hover:bg-red-600 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loadingInterestId === interest.interestId
                        ? "..."
                        : "Reject"}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default FarmerInterests;
