import { motion } from "framer-motion";
import { Link } from "react-router";

const EachCrops = ({ crops, index }) => {
  return (
    <motion.div
      className="flex flex-col border border-(--color-border) rounded-2xl overflow-hidden shadow-md 
      hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-(--color-surface) h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.32), ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Image Container with aspect ratio */}
      <div className="relative overflow-hidden aspect-[4/3] w-full bg-slate-100 dark:bg-slate-800">
        <img
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          src={crops.image}
          alt={crops.name}
          loading="lazy"
        />
        {/* Floating Type Badge */}
        <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
          {crops.type}
        </span>
      </div>

      {/* Content details */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 text-left">
        <h3 className="text-lg sm:text-xl font-bold text-[var(--color-text)] mb-2 line-clamp-1">
          {crops.name}
        </h3>

        <div className="space-y-1 sm:space-y-1.5 mb-4">
          <p className="text-xs sm:text-sm font-semibold text-[var(--color-muted)] flex items-center gap-1.5">
            <span className="text-[var(--color-secondary)] uppercase tracking-wider text-[10px] sm:text-xs font-bold">Type:</span>{" "}
            {crops.type}
          </p>

          <p className="text-xs sm:text-sm font-semibold text-[var(--color-muted)] flex items-center gap-1.5">
            <span className="text-[var(--color-secondary)] uppercase tracking-wider text-[10px] sm:text-xs font-bold">Price:</span>{" "}
            <span className="text-[var(--color-text)] font-bold text-sm sm:text-base">{crops.pricePerUnit}</span>/Kg
          </p>
        </div>

        {/* View Details Button at the absolute bottom of the card content */}
        <div className="mt-auto w-full">
          <Link to={`/crops-details/${crops._id}/${crops.type}`} className="block w-full">
            <button
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white py-2 rounded-lg font-bold text-xs sm:text-sm
              transition-all active:scale-[0.98] hover:cursor-pointer text-center"
            >
              View Details
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EachCrops;
