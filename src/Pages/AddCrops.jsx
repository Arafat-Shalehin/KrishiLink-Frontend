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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // ✅ Validate form before submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Crop name is required";
    }

    if (!formData.type) {
      newErrors.type = "Please select a crop type";
    }

    const price = parseFloat(formData.pricePerUnit);
    if (!formData.pricePerUnit || isNaN(price) || price <= 0) {
      newErrors.pricePerUnit = "Price must be greater than 0";
    }

    const qty = parseInt(formData.quantity, 10);
    if (!formData.quantity || isNaN(qty) || qty < 1) {
      newErrors.quantity = "Quantity must be at least 1";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    } else if (!isValidUrl(formData.image)) {
      newErrors.image = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Helper to validate URL
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate before submission
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    // ✅ Convert to proper data types before sending
    const dataToSend = {
      name: formData.name.trim(),
      type: formData.type,
      pricePerUnit: parseFloat(formData.pricePerUnit), // ✅ Convert to Number
      unit: formData.unit,
      quantity: parseInt(formData.quantity, 10), // ✅ Convert to Integer
      description: formData.description.trim(),
      location: formData.location.trim(),
      image: formData.image.trim(),
      owner: {
        ownerEmail: user.email,
        ownerName: user.displayName,
      },
    };

    try {
      setLoading(true);
      await instance.post("/allCrops", dataToSend);
      toast.success("Crop added successfully!");
      navigate("/dashboard/farmer/crops");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to add crop. Try again!",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <AddCropsSkeleton />;

  return (
    <section className="py-20 text-(--color-text)">
      <motion.div
        className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl shadow-lg border border-(--color-border) bg-(--color-surface)"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-(--color-text) mb-2 text-center">
          Add New <span className="text-(--color-primary)">Crop</span>
        </h1>
        <p className="text-center text-sm sm:text-base text-(--color-muted) mb-6">
          Fill out the crop details carefully to attract buyers.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Crop Name */}
          <div>
            <label className="block text-sm font-semibold text-(--color-text) mb-1">
              Crop Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border ${
                errors.name ? "border-red-500" : "border-(--color-border)"
              } bg-(--color-surface) text-(--color-text) placeholder:text-(--color-muted) rounded-xl focus:outline-none focus:ring-4 focus:ring-(--color-primary)/20`}
              placeholder="e.g., Tomato"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Type & Unit */}
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-(--color-text) mb-1">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border ${
                  errors.type ? "border-red-500" : "border-(--color-border)"
                } bg-(--color-surface) text-(--color-text) rounded-xl focus:outline-none focus:ring-4 focus:ring-(--color-primary)/20`}
              >
                <option value="">Select Type</option>
                <option value="Vegetable">Vegetable</option>
                <option value="Fruit">Fruit</option>
                <option value="Grain">Grain</option>
                <option value="Legume">Legume</option>
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-500">{errors.type}</p>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold text-(--color-text) mb-1">
                Unit
              </label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-(--color-border) bg-(--color-surface) text-(--color-text) rounded-xl focus:outline-none focus:ring-4 focus:ring-(--color-primary)/20"
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
              <label className="block text-sm font-semibold text-(--color-text) mb-1">
                Price per Unit (৳) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="pricePerUnit"
                value={formData.pricePerUnit}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                className={`w-full px-4 py-2.5 border ${
                  errors.pricePerUnit
                    ? "border-red-500"
                    : "border-(--color-border)"
                } bg-(--color-surface) text-(--color-text) placeholder:text-(--color-muted) rounded-xl focus:outline-none focus:ring-4 focus:ring-(--color-primary)/20`}
                placeholder="e.g., 50"
              />
              {errors.pricePerUnit && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.pricePerUnit}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-(--color-text) mb-1">
                Estimated Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                step="1"
                className={`w-full px-4 py-2.5 border ${
                  errors.quantity ? "border-red-500" : "border-(--color-border)"
                } bg-(--color-surface) text-(--color-text) placeholder:text-(--color-muted) rounded-xl focus:outline-none focus:ring-4 focus:ring-(--color-primary)/20`}
                placeholder="e.g., 500"
              />
              {errors.quantity && (
                <p className="mt-1 text-sm text-red-500">{errors.quantity}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-(--color-text) mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border ${
                errors.description
                  ? "border-red-500"
                  : "border-(--color-border)"
              } bg-(--color-surface) text-(--color-text) placeholder:text-(--color-muted) rounded-xl focus:outline-none focus:ring-4 focus:ring-(--color-primary)/20`}
              rows="3"
              placeholder="Brief description about the crop..."
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-(--color-text) mb-1">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border ${
                errors.location ? "border-red-500" : "border-(--color-border)"
              } bg-(--color-surface) text-(--color-text) placeholder:text-(--color-muted) rounded-xl focus:outline-none focus:ring-4 focus:ring-(--color-primary)/20`}
              placeholder="e.g., Bogura, Bangladesh"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-500">{errors.location}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-semibold text-(--color-text) mb-1">
              Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border ${
                errors.image ? "border-red-500" : "border-(--color-border)"
              } bg-(--color-surface) text-(--color-text) placeholder:text-(--color-muted) rounded-xl focus:outline-none focus:ring-4 focus:ring-(--color-primary)/20`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-500">{errors.image}</p>
            )}
          </div>

          {/* Image Preview */}
          {formData.image && isValidUrl(formData.image) && (
            <div className="flex justify-center mt-4">
              <div className="w-full rounded-2xl border border-(--color-border) bg-(--color-bg) p-4">
                <p className="text-sm font-semibold text-(--color-muted) mb-3 text-center">
                  Preview
                </p>
                <img
                  src={formData.image}
                  alt="Crop Preview"
                  className="max-h-52 mx-auto rounded-xl shadow-md object-contain bg-(--color-surface)"
                  onError={(e) => {
                    e.target.style.display = "none";
                    setErrors({ ...errors, image: "Failed to load image" });
                  }}
                />
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-3 rounded-xl bg-(--color-primary) hover:brightness-95 text-white font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Adding Crop...
              </>
            ) : (
              "Add Crop"
            )}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default AddCrops;
