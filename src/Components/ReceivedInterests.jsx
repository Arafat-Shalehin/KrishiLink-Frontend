import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAxios from "../Hooks/useAxios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Loader from "./Loader";

const ReceivedInterests = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const instance = useAxios();

  const [receivedInterests, setReceivedInterests] = useState([]);
  const [loadingInterestId, setLoadingInterestId] = useState(null);

  useEffect(() => {
    const fetchCrops = async () => {
      if (!user?.email) return;

      setLoading(true);
      try {
        const res = await instance.get("/allCrops");
        const allCrops = res.data || [];

        const ownerCrops = allCrops.filter(
          (crop) => crop?.owner?.ownerEmail === user?.email
        );

        const allInterests = ownerCrops.flatMap((crop) =>
          (crop.interests || []).map((interest) => ({
            cropId: crop._id,
            cropName: crop.name,
            buyerName: interest.userName,
            buyerEmail: interest.userEmail,
            quantity: interest.quantity,
            message: interest.message,
            status: interest.status,
            interestId: interest._id,
          }))
        );

        setReceivedInterests(allInterests);
      } catch (error) {
        console.error("Error fetching crops:", error);
        toast.error("Failed to load received interests.");
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, [instance, user?.email, setLoading]);

  // Handle Accept/Reject
  const handleStatusChange = async (cropId, interestId, newStatus) => {
    try {
      setLoadingInterestId(interestId);
      const res = await instance.patch(
        `/updateInterestStatus/${cropId}/${interestId}`,
        { status: newStatus }
      );

      toast.success(res.data.message);

      setReceivedInterests((prev) =>
        prev.map((interest) =>
          interest.interestId === interestId
            ? { ...interest, status: newStatus }
            : interest
        )
      );
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update status");
    } finally {
      setLoadingInterestId(null);
    }
  };

  if (loading) return <Loader />;

  return (
    <motion.div
      className="mt-12 bg-white shadow-xl rounded-2xl p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="mt-10 text-3xl font-bold mb-8 text-green-800 text-center">
        Received Interests
      </h3>

      {receivedInterests.length === 0 ? (
        <p className="text-center text-gray-500 italic">
          No interest requests received yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-xl">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th className="px-4 py-2 text-left">Crop</th>
                <th className="px-4 py-2 text-left">Buyer</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Message</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {receivedInterests.map((interest) => (
                <motion.tr
                  key={interest.interestId}
                  className="border-t hover:bg-gray-50 transition duration-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-4 py-2 font-medium text-gray-800">
                    {interest.cropName}
                  </td>
                  <td className="px-4 py-2">{interest.buyerName}</td>
                  <td className="px-4 py-2">{interest.quantity}</td>
                  <td className="px-4 py-2">{interest.message}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      interest.status === "accepted"
                        ? "text-green-600"
                        : interest.status === "rejected"
                        ? "text-red-500"
                        : "text-yellow-600"
                    }`}
                  >
                    {interest.status}
                  </td>

                  <td className="px-4 py-2 space-x-2">
                    <button
                      disabled={
                        interest.status !== "pending" ||
                        loadingInterestId === interest.interestId
                      }
                      onClick={() =>
                        handleStatusChange(
                          interest.cropId,
                          interest.interestId,
                          "accepted"
                        )
                      }
                      className="border bg-green-200 border-green-500 text-black px-3 py-1 rounded hover:bg-green-600 hover:text-white duration-300 disabled:bg-gray-300"
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
                          "rejected"
                        )
                      }
                      className="bg-red-200 border border-red-500 text-black px-3 py-1 rounded hover:bg-red-600 hover:text-white duration-300 disabled:bg-gray-300"
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

export default ReceivedInterests;