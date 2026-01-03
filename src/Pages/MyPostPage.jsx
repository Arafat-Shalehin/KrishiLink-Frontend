import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAxios from "../Hooks/useAxios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import MyPostPageSkeleton from "../Components/Skeleton/MyPostPageSkeleton";

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
    return <MyPostPageSkeleton rows={6} />;
  }

  return (
    <section className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="mt-10 text-2xl sm:text-3xl font-bold mb-8 text-center text-[var(--color-text)]">
          My <span className="text-[var(--color-primary)]">Posts</span>
        </h2>

        {/* Table */}
        <div className="overflow-x-auto bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl rounded-2xl p-4">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-bg))] text-[var(--color-text)]">
                <th className="py-3 px-4 font-semibold">Image</th>
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Price</th>
                <th className="py-3 px-4 font-semibold">Quantity</th>
                <th className="py-3 px-4 font-semibold">Location</th>
                <th className="py-3 px-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {myCrops.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="py-10 text-center text-base text-[var(--color-muted)]"
                  >
                    No posts found.
                  </td>
                </tr>
              ) : (
                myCrops.map((crop) => (
                  <tr
                    key={crop._id}
                    className="border-b border-[var(--color-border)] hover:bg-[color-mix(in_srgb,var(--color-primary)_6%,transparent)] transition-all duration-200"
                  >
                    <td className="py-2 px-4">
                      <img
                        src={crop.image}
                        alt={crop.name}
                        className="w-16 h-16 object-cover rounded-xl border border-[var(--color-border)]"
                      />
                    </td>

                    <td className="py-2 px-4 font-semibold text-[var(--color-text)]">
                      {crop.name}
                    </td>

                    <td className="py-2 px-4 text-[var(--color-muted)]">
                      {crop.type}
                    </td>

                    <td className="py-2 px-4 text-[var(--color-text)]/90">
                      <span className="font-semibold text-[var(--color-primary)]">
                        {crop.pricePerUnit}
                      </span>{" "}
                      / {crop.unit}
                    </td>

                    <td className="py-2 px-4 text-[var(--color-text)]/90">
                      {crop.quantity}
                    </td>

                    <td className="py-2 px-4 text-[var(--color-text)]/90">
                      {crop.location}
                    </td>

                    <td className="py-2 px-4">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleEdit(crop)}
                          className="p-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)] hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] hover:scale-105 transition"
                          aria-label="Edit crop"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(crop._id)}
                          className="p-2 rounded-full border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 hover:scale-105 transition"
                          aria-label="Delete crop"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
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
              className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
            >
              <motion.div
                initial={{ scale: 0.92, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.92, y: 10 }}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 w-full max-w-lg shadow-2xl"
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center text-[var(--color-text)]">
                  Edit <span className="text-[var(--color-primary)]">Crop</span>
                </h3>

                <form onSubmit={handleSave} className="space-y-3">
                  <input
                    name="name"
                    defaultValue={selectedCrop.name}
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm sm:text-base text-[var(--color-text)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
                    required
                    placeholder="Crop name"
                  />

                  <input
                    name="type"
                    defaultValue={selectedCrop.type}
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm sm:text-base text-[var(--color-text)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
                    required
                    placeholder="Type"
                  />

                  <input
                    name="pricePerUnit"
                    type="number"
                    defaultValue={selectedCrop.pricePerUnit}
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm sm:text-base text-[var(--color-text)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
                    required
                    placeholder="Price per unit"
                  />

                  <input
                    name="unit"
                    defaultValue={selectedCrop.unit}
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm sm:text-base text-[var(--color-text)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
                    required
                    placeholder="Unit"
                  />

                  <input
                    name="quantity"
                    type="number"
                    defaultValue={selectedCrop.quantity}
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm sm:text-base text-[var(--color-text)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
                    required
                    placeholder="Quantity"
                  />

                  <input
                    name="location"
                    defaultValue={selectedCrop.location}
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm sm:text-base text-[var(--color-text)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
                    required
                    placeholder="Location"
                  />

                  <input
                    name="image"
                    defaultValue={selectedCrop.image}
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm sm:text-base text-[var(--color-text)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
                    required
                    placeholder="Image URL"
                  />

                  <textarea
                    name="description"
                    defaultValue={selectedCrop.description}
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm sm:text-base text-[var(--color-text)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
                    required
                    placeholder="Description"
                    rows={3}
                  />

                  <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2.5 rounded-xl border border-[var(--color-secondary)] text-[var(--color-secondary)] hover:bg-[color-mix(in_srgb,var(--color-secondary)_10%,transparent)] transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-[var(--color-primary)] text-white font-semibold hover:brightness-95 transition"
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
    </section>
  );
};

export default MyPostPage;
