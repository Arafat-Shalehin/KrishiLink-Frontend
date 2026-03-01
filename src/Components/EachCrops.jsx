import { motion } from "framer-motion";
import { Link } from "react-router";

const EachCrops = ({ crops, index }) => {
  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-evenly 
      border border-(--color-border) rounded-2xl overflow-hidden shadow-md 
      hover:shadow-lg transition-shadow duration-300 
      bg-(--color-surface) p-4 md:p-6 gap-5 lg:gap-0"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.32), ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Image */}
      <div>
        <img
          className="w-50 h-50 object-cover rounded-lg hover:scale-105 transition-transform duration-500"
          src={crops.image}
          alt={crops.name}
          loading="lazy"
        />
      </div>

      {/* Text */}
      <div className="space-y-2 md:space-y-3 text-left">
        <p className="text-xl font-bold text-[var(--color-text)]">
          {crops.name}
        </p>

        <p className="text-lg font-semibold text-[var(--color-muted)]">
          <span className="text-[var(--color-secondary)]">Type:</span>{" "}
          {crops.type}
        </p>

        <p className="text-lg font-semibold text-[var(--color-muted)]">
          <span className="text-[var(--color-secondary)]">Price:</span>{" "}
          {crops.pricePerUnit}/Kg
        </p>

        <Link to={`/crops-details/${crops._id}/${crops.type}`}>
          <button
            className="bg-[var(--color-primary)] text-white px-4 py-2 rounded font-semibold
            hover:brightness-95 transition hover:cursor-pointer"
          >
            View Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default EachCrops;
