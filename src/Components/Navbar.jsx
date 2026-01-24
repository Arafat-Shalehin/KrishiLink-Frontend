// Navbar.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import projectLogo from "../Assets/unnamed.webp";
import { AuthContext } from "../Context/AuthProvider";
import { toast } from "react-toastify";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, dltUser } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dltUser();
      toast.success("Signed out successfully.");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setMobileOpen(false);
    }
  };

  const navLinkClass = ({ isActive }) =>
    [
      "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
      isActive
        ? "bg-[var(--color-primary)] text-white shadow-sm"
        : [
            "text-[var(--color-text)]/90",
            "hover:text-[var(--color-primary)]",
            "hover:bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)]",
            "dark:hover:bg-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]",
          ].join(" "),
    ].join(" ");

  const links = useMemo(
    () => [
      { to: "/", label: "Home" },
      { to: "/all-crops", label: "All Crops" },
      { to: "/dashboard", label: "Dashboard" }, // shown always; protected inside router
    ],
    [],
  );

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b border-[var(--color-border)] backdrop-blur-md",
        "bg-[color-mix(in_srgb,var(--color-bg)_86%,transparent)]",
      ].join(" ")}
    >
      <nav className="h-16 flex items-center justify-center px-4 sm:px-6 lg:px-8 text-[var(--color-text)]">
        {/* LEFT */}
        <div className="flex flex-1 items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className={[
              "mr-1 inline-flex items-center justify-center rounded-md p-2 transition-colors md:hidden",
              "text-[var(--color-text)]/80 hover:text-[var(--color-text)]",
              "hover:bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)]",
              "dark:hover:bg-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
            ].join(" ")}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenu className="h-6 w-6" />
            )}
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 rounded-md py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            onClick={() => setMobileOpen(false)}
          >
            <img
              className="h-5 w-5 md:h-9 md:w-9 rounded-full object-cover ring-2 ring-[color-mix(in_srgb,var(--color-primary)_28%,transparent)]"
              src={projectLogo}
              alt="KrishiLink logo"
            />
            <span className="text-sm md:text-lg font-semibold tracking-tight sm:text-xl">
              <span className="text-[var(--color-primary)]">Krishi</span>
              <span className="text-[var(--color-text)]">Link</span>
              <span className="ml-1 align-super text-xs text-[var(--color-accent)]">
                ●
              </span>
            </span>
          </Link>
        </div>

        {/* CENTER: desktop links */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* RIGHT */}
        <div className="flex flex-1 justify-end gap-3">
          {!user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden md:flex">
                <ThemeToggle />
              </div>
              <Link
                to="/auth/login"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:brightness-95 transition"
              >
                <IoLogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
            </div>
          ) : (
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm hover:border-[var(--color-primary)] transition"
                aria-label="Open profile menu"
              >
                <img
                  alt={user.displayName || "User avatar"}
                  referrerPolicy="no-referrer"
                  src={
                    user.photoURL ||
                    "https://static.vecteezy.com/system/resources/previews/007/296/447/non_2x/user-icon-in-flat-style-person-icon-client-symbol-vector.jpg"
                  }
                  className="h-full w-full object-cover"
                />
              </button>

              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content mt-3 w-56 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2 shadow-lg"
              >
                <li className="mb-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-xs">
                  <p className="truncate text-sm font-semibold">
                    {user.displayName || "User"}
                  </p>
                  <p className="truncate text-[11px] text-[var(--color-muted)]">
                    {user.email}
                  </p>
                </li>

                <li className="px-2 py-1">
                  <ThemeToggle />
                </li>

                <div className="border my-2 border-[var(--color-border)]" />

                <li>
                  <Link to="/dashboard" className="rounded-lg">
                    Dashboard
                  </Link>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="mt-1 inline-flex items-center justify-start gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                  >
                    <IoLogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* MOBILE NAV PANEL */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="border-t border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm md:hidden"
            style={{ overflow: "hidden" }}
          >
            <div className="mx-auto max-w-7xl px-4 pb-4 pt-3 sm:px-6">
              {!user && (
                <>
                  <ThemeToggle />
                  <div className="border border-[var(--color-border)] my-2" />
                </>
              )}

              <nav className="flex flex-col gap-1">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      [
                        "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-[var(--color-primary)] text-white"
                          : "text-[var(--color-text)]/90 hover:text-[var(--color-primary)] hover:bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)]",
                      ].join(" ")
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}

                <div className="mt-2 border-t border-[var(--color-border)] pt-3">
                  {!user ? (
                    <Link
                      to="/auth/login"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:brightness-95"
                      onClick={() => setMobileOpen(false)}
                    >
                      <IoLogIn className="h-4 w-4" />
                      <span>Login</span>
                    </Link>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-red-500 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/30"
                    >
                      <IoLogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  )}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
