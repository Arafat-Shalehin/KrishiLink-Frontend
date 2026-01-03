import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../Context/ThemeProvider";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={[
        "inline-flex items-center justify-center",
        "h-10 w-10 rounded-full border shadow-sm transition",
        "border-[var(--color-border)] bg-[var(--color-surface)]",
        "text-[var(--color-text)]",
        "hover:border-[var(--color-primary)]",
        "hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,var(--color-surface))]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
      ].join(" ")}
    >
      {isDark ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
    </button>
  );
};

export default ThemeToggle;
