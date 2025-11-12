import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAxios from "../Hooks/useAxios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";

const MyInterest = () => {
  const { user } = useContext(AuthContext);
  const instance = useAxios();
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);

    instance
      .get(`/myInterests?email=${user.email}`)
      .then((res) => {
        setInterests(res.data.interests || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load interests!");
        setLoading(false);
      });
  }, [user, instance]);

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "text-green-700 bg-green-100";
      case "rejected":
        return "text-red-700 bg-red-100";
      default:
        return "text-yellow-700 bg-yellow-100";
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <motion.div
      className="p-8 bg-gray-50 min-h-screen"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="mt-15 text-3xl font-bold mb-8 text-green-700 text-center">
        My Interests
      </h2>
      <div className="flex items-center justify-between">
        <div className="mb-10 text-gray-500 font-semibold text-xl">Total Interest: {interests.length}</div>
        <div></div>
      </div>

      <div className="overflow-x-auto bg-white shadow-xl rounded-2xl p-4">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-green-100 text-green-800">
              <th className="py-3 px-4">Crop</th>
              <th className="py-3 px-4">Owner</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Message</th>
              <th className="py-3 px-4 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {interests.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-6 text-center text-gray-500">
                  You haven’t shown interest in any crops yet.
                </td>
              </tr>
            ) : (
              interests.map((interest) => (
                <tr
                  key={interest._id}
                  className="border-b hover:bg-green-50 transition-all duration-200"
                >
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={
                        interest.cropImage || "https://via.placeholder.com/50"
                      }
                      alt={interest.cropName}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {interest.cropName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {interest.cropLocation}
                      </p>
                    </div>
                  </td>

                  <td className="py-3 px-4">{interest.ownerName}</td>
                  <td className="py-3 px-4">{interest.cropType}</td>
                  <td className="py-3 px-4">{interest.quantity}</td>
                  <td className="py-3 px-4 text-gray-700 italic">
                    {interest.message || "—"}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        interest.status
                      )}`}
                    >
                      {interest.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default MyInterest;
