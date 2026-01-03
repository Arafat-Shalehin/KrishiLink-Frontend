import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthProvider";
import useAxios from "../Hooks/useAxios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import AddCropsSkeleton from "../Components/Skeleton/AddCropsSkeleton";

const AddCrops = () => {
  const { user } = useContext(AuthContext);
  const instance = useAxios();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    pricePerUnit: "",
    unit: "kg",
    quantity: "",
    description: "",
    location: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      owner: {
        ownerEmail: user.email,
        ownerName: user.displayName,
      },
    };

    try {
      setLoading(true);
      await instance.post("/allCrops", dataToSend);
      toast.success("Crop added successfully!");
      navigate("/my-posts");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add crop. Try again!");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <AddCropsSkeleton />;

  return (
    <section className="py-20 bg-[var(--color-bg)] text-[var(--color-text)]">
      <motion.div
        className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl shadow-lg border border-[var(--color-border)] bg-[var(--color-surface)]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] mb-2 text-center">
          Add New <span className="text-[var(--color-primary)]">Crop</span>
        </h1>
        <p className="text-center text-sm sm:text-base text-[var(--color-muted)] mb-6">
          Fill out the crop details carefully to attract buyers.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Crop Name */}
          <div>
            <label className="block text-sm font-semibold text-[var(--color-text)] mb-1">
              Crop Name
            </label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] rounded-xl focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
              placeholder="e.g., Tomato"
            />
          </div>

          {/* Type & Unit */}
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-[var(--color-text)] mb-1">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] rounded-xl focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
              >
                <option value="">Select Type</option>
                <option value="Vegetable">Vegetable</option>
                <option value="Fruit">Fruit</option>
                <option value="Grain">Grain</option>
                <option value="Legume">Legume</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold text-[var(--color-text)] mb-1">
                Unit
              </label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] rounded-xl focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
              >
                <option value="kg">kg</option>
                <option value="ton">ton</option>
                <option value="bag">bag</option>
              </select>
            </div>
          </div>

          {/* Price & Quantity */}
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-[var(--color-text)] mb-1">
                Price per Unit
              </label>
              <input
                required
                type="number"
                name="pricePerUnit"
                value={formData.pricePerUnit}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] rounded-xl focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
                placeholder="e.g., 50"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-[var(--color-text)] mb-1">
                Estimated Quantity
              </label>
              <input
                required
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] rounded-xl focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
                placeholder="e.g., 500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-[var(--color-text)] mb-1">
              Description
            </label>
            <textarea
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] rounded-xl focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
              rows="3"
              placeholder="Brief description about the crop..."
            ></textarea>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-[var(--color-text)] mb-1">
              Location
            </label>
            <input
              required
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] rounded-xl focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
              placeholder="e.g., Bogura"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-semibold text-[var(--color-text)] mb-1">
              Image URL
            </label>
            <input
              required
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] rounded-xl focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
              placeholder="Paste image URL here..."
            />
          </div>

          {/* Image Preview */}
          {formData.image && (
            <div className="flex justify-center mt-4">
              <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
                <p className="text-sm font-semibold text-[var(--color-muted)] mb-3 text-center">
                  Preview
                </p>
                <img
                  src={formData.image}
                  alt="Crop Preview"
                  className="max-h-52 mx-auto rounded-xl shadow-md object-contain bg-[var(--color-surface)]"
                />
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-3 rounded-xl bg-[var(--color-primary)] hover:brightness-95 text-white font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Adding Crop..." : "Add Crop"}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default AddCrops;
