import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAxios from "../Hooks/useAxios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { Pencil, Trash2 } from "lucide-react";
import Loader from "../Components/Loader";
import Swal from "sweetalert2";

const MyPostPage = () => {
  const { user } = useContext(AuthContext);
  const instance = useAxios();
  const [myCrops, setMyCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState(null); // for edit modal
  const [showModal, setShowModal] = useState(false);

  // Fetch user’s crops
  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    instance
      .get(`/myCrops?email=${user.email}`)
      .then((res) => {
        setMyCrops(res.data.crops);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user, instance]);

  // Handle delete
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const res = await instance.delete(`/myCrops/${id}`);
        if (res.data.success) {
          toast.success("Crop deleted successfully!");
          setMyCrops(myCrops.filter((crop) => crop._id !== id));
        } else {
          toast.error("Failed to delete crop.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Server error.");
      }
    }
  };

  // Handle edit open
  const handleEdit = (crop) => {
    setSelectedCrop(crop);
    setShowModal(true);
  };

  // Handle save after edit
  const handleSave = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedCrop = {
      name: form.name.value,
      type: form.type.value,
      pricePerUnit: parseFloat(form.pricePerUnit.value),
      unit: form.unit.value,
      quantity: parseInt(form.quantity.value),
      description: form.description.value,
      location: form.location.value,
      image: form.image.value,
    };

    try {
      const res = await instance.put(
        `/myCrops/${selectedCrop._id}`,
        updatedCrop
      );
      if (res.data.success) {
        toast.success("Crop updated successfully!");
        setMyCrops(
          myCrops.map((crop) =>
            crop._id === selectedCrop._id ? { ...crop, ...updatedCrop } : crop
          )
        );
        setShowModal(false);
      } else {
        toast.error("Failed to update crop.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="mt-20 text-3xl font-bold mb-8 text-green-700 text-center">
        My Posts
      </h2>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-xl rounded-2xl p-4">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-green-100 text-green-800">
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myCrops.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="py-6 text-center text-lg text-gray-500"
                >
                  No posts found.
                </td>
              </tr>
            ) : (
              myCrops.map((crop) => (
                <tr
                  key={crop._id}
                  className="border-b hover:bg-green-50 transition-all duration-200"
                >
                  <td className="py-2 px-4">
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                  </td>
                  <td className="py-2 px-4">{crop.name}</td>
                  <td className="py-2 px-4">{crop.type}</td>
                  <td className="py-2 px-4">
                    {crop.pricePerUnit} / {crop.unit}
                  </td>
                  <td className="py-2 px-4">{crop.quantity}</td>
                  <td className="py-2 px-4">{crop.location}</td>
                  <td className="py-2 px-4 flex items-center justify-center gap-3 mt-4">
                    <button
                      onClick={() => handleEdit(crop)}
                      className="p-2 bg-green-100 text-green-700 rounded-full hover:scale-110 transition"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(crop._id)}
                      className="p-2 bg-red-100 text-red-700 rounded-full hover:scale-110 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl"
            >
              <h3 className="text-2xl font-bold mb-4 text-green-700 text-center">
                Edit Crop
              </h3>
              <form onSubmit={handleSave} className="space-y-3">
                <input
                  name="name"
                  defaultValue={selectedCrop.name}
                  className="w-full border rounded-lg p-2"
                  required
                />
                <input
                  name="type"
                  defaultValue={selectedCrop.type}
                  className="w-full border rounded-lg p-2"
                  required
                />
                <input
                  name="pricePerUnit"
                  type="number"
                  defaultValue={selectedCrop.pricePerUnit}
                  className="w-full border rounded-lg p-2"
                  required
                />
                <input
                  name="unit"
                  defaultValue={selectedCrop.unit}
                  className="w-full border rounded-lg p-2"
                  required
                />
                <input
                  name="quantity"
                  type="number"
                  defaultValue={selectedCrop.quantity}
                  className="w-full border rounded-lg p-2"
                  required
                />
                <input
                  name="location"
                  defaultValue={selectedCrop.location}
                  className="w-full border rounded-lg p-2"
                  required
                />
                <input
                  name="image"
                  defaultValue={selectedCrop.image}
                  className="w-full border rounded-lg p-2"
                  required
                />
                <textarea
                  name="description"
                  defaultValue={selectedCrop.description}
                  className="w-full border rounded-lg p-2"
                  required
                />

                <div className="flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyPostPage;
