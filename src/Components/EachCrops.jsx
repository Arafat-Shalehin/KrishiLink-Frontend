import { motion } from "framer-motion";

const EachCrops = ({ crops }) => {
  console.log(crops);
  const textVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row items-center justify-evenly 
      border border-gray-200 rounded-2xl overflow-hidden shadow-md 
      hover:shadow-lg transition-all duration-300 
      bg-white hover:-translate-y-1 p-4 md:p-6 gap-5 lg:gap-0"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Image */}
      <div>
        <img
          className="w-50 h-50 object-cover rounded-lg hover:scale-125 transition-all ease-in-out"
          src={crops.image}
          alt={crops.name}
        />
      </div>

      {/* Text */}
      <div
        className="space-y-2 md:space-y-3 text-left"
      >
        {[
          crops.name,
          `Type: ${crops.type}`,
          `Price: ${crops.pricePerUnit}/Kg`,
        ].map((text, i) => (
          <motion.p
            key={i}
            custom={i}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`line-clamp-1 ${
              i === 0
                ? "text-2xl font-bold text-gray-800"
                : "text-lg font-semibold text-gray-600"
            }`}
          >
            {text}
          </motion.p>
        ))}

        <motion.button
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="bg-linear-to-r from-green-700 to-green-400 
          text-white lg:px-6 px-4 py-2 rounded font-semibold 
          hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EachCrops;
