import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CounterCard = ({ number, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = number;
    const duration = 2000;
    const increment = end / (duration / 20); 

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setCount(Math.floor(start));
    }, 20);

    return () => clearInterval(counter);
  }, [isInView, number]);

  return (
    <motion.div
      ref={ref}
      className="bg-green-100 rounded-xl py-8 hover:bg-green-200 transition duration-300 shadow-sm"
    >
      <h3 className="text-3xl font-bold text-green-800">
        {count.toLocaleString()}
      </h3>
      <p className="text-gray-700 mt-2">{label}</p>
    </motion.div>
  );
};

export default CounterCard;