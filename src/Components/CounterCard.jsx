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
    /* ── Counter card: uses CSS variables so it respects light/dark mode.*/
    <motion.div
      ref={ref}
      /* ── Gentle fade-up as the stats row enters the viewport ── */
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-surface))] 
        rounded-xl py-8 border border-[var(--color-border)]
        hover:bg-[color-mix(in_srgb,var(--color-primary)_20%,var(--color-surface))] 
        transition duration-300 shadow-sm"
    >
      {/* ── Number display: uses primary color from the theme ── */}
      <h3 className="text-3xl font-bold text-[var(--color-primary)]">
        {count.toLocaleString()}
      </h3>
      {/* ── Label: uses muted color from the theme ── */}
      <p className="text-[var(--color-muted)] mt-2">{label}</p>
    </motion.div>
  );
};

export default CounterCard;