import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthProvider";
import useAxios from "../Hooks/useAxios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

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

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-30 mb-15 p-8 rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Add New Crop
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Crop Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Crop Name
          </label>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="e.g., Tomato"
          />
        </div>

        {/* Type & Unit */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select Type</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Fruit">Fruit</option>
              <option value="Grain">Grain</option>
              <option value="Legume">Legume</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">Unit</label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
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
            <label className="block text-gray-700 font-medium mb-1">
              Price per Unit
            </label>
            <input
              required
              type="number"
              name="pricePerUnit"
              value={formData.pricePerUnit}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="e.g., 50"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">
              Estimated Quantity
            </label>
            <input
              required
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="e.g., 500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            required
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            rows="3"
            placeholder="Brief description about the crop..."
          ></textarea>
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Location
          </label>
          <input
            required
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="e.g., Bogura"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Image URL
          </label>
          <input
            required
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Paste image URL here..."
          />
        </div>

        {/* Image Preview */}
        {formData.image && (
          <div className="flex justify-center mt-4">
            <img
              src={formData.image}
              alt="Crop Preview"
              className="max-h-48 rounded-xl shadow-md object-contain"
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
        >
          {loading ? "Adding Crop..." : "Add Crop"}
        </button>
      </form>
    </motion.div>
  );
};

export default AddCrops;
