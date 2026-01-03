import { motion } from "framer-motion";
import CounterCard from "./CounterCard";
import { Link } from "react-router";

const stats = [
  { number: 12000, label: "Farmers Connected" },
  { number: 50, label: "Districts Reached" },
  { number: 30, label: "Crop Varieties Listed" },
  { number: 95, label: "User Satisfaction (%)" },
];

const OurMissionImpact = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[var(--color-bg)] to-[var(--color-surface)] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16 flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 text-center lg:text-left"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
            Our Mission
          </h2>

          <p className="text-[var(--color-muted)] leading-relaxed mb-6 text-sm sm:text-base">
            At{" "}
            <span className="font-semibold text-[var(--color-primary)]">
              KrishiLink
            </span>
            , our mission is to empower farmers by bridging the gap between
            producers, consumers, and technology. We aim to create a digital
            ecosystem where rural growers can thrive through access to fair
            markets, reliable information, and modern agricultural innovations.
          </p>

          <p className="text-[var(--color-muted)] leading-relaxed mb-6 text-sm sm:text-base">
            By connecting farmers directly to buyers and experts, we are helping
            to build a sustainable, transparent, and profitable farming network
            for the next generation.
          </p>

          <Link
            to="/about"
            className="bg-[var(--color-primary)] text-white lg:px-6 px-4 py-3 rounded font-semibold 
          hover:brightness-95 hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Learn More
          </Link>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 flex justify-center"
        >
          <img
            src="https://images.pexels.com/photos/18710221/pexels-photo-18710221.jpeg"
            alt="Farmers working in a field"
            className="rounded-2xl shadow-xl w-full max-w-md object-cover border border-[var(--color-border)]"
          />
        </motion.div>
      </div>

      {/* Impact Section with Animated Counters */}
      <div className="mt-16 w-[90%] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat, idx) => (
          <CounterCard key={idx} number={stat.number} label={stat.label} />
        ))}
      </div>
    </section>
  );
};

export default OurMissionImpact;
