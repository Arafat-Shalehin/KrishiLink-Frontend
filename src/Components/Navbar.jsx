import React, { useContext, useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router";
import {
  LogOut,
  Menu,
  X,
  Bell,
  LayoutDashboard
} from "lucide-react";
import projectLogo from "../Assets/unnamed.webp";
import { AuthContext } from "../Context/AuthProvider";
import { toast } from "react-toastify";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, dltUser } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      "inline-flex items-center px-3 py-2 text-[14px] transition-colors duration-200 rounded-xl",
      isActive
        ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 font-semibold"
        : "font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10",
    ].join(" ");

  const links = useMemo(
    () => [
      { to: "/all-crops", label: "Marketplace" },
      { to: "/about", label: "About" },
    ],
    [],
  );

  return (
    <header className="sticky top-0 z-50 pt-4 px-4 sm:px-6 lg:px-8 pb-2 pointer-events-none">
      {/* 
        pointer-events-none on the header wrapper so clicks pass through to the page below
        pointer-events-auto on the nav itself
      */}
      <nav
        className={`pointer-events-auto mx-auto max-w-7xl h-16 flex items-center justify-between px-5 sm:px-6 lg:px-8 rounded-2xl transition-all duration-300 ${scrolled
          ? "bg-[#faf8f4]/85 dark:bg-[#0c0e13]/85 backdrop-blur-md shadow-sm border border-slate-200/50 dark:border-slate-800/50"
          : "bg-[#faf8f4]/60 dark:bg-[#0c0e13]/60 backdrop-blur-sm border border-transparent"
          }`}
      >
        {/* LEFT: Logo */}
        <div className="flex flex-1 items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2.5 focus:outline-none"
            onClick={() => setMobileOpen(false)}
          >
            <div className="bg-white dark:bg-slate-800 p-1 rounded-xl shadow-xs border border-slate-100 dark:border-slate-700">
              <img
                className="h-6 w-6 object-cover rounded-lg"
                src={projectLogo}
                alt="KrishiLink logo"
              />
            </div>
            <span className="text-[1.15rem] font-bold tracking-tight">
              <span className="text-emerald-700 dark:text-emerald-500">Krishi</span>
              <span className="text-slate-800 dark:text-slate-100">Link</span>
            </span>
          </Link>
        </div>

        {/* CENTER: Desktop Links */}
        <div className="hidden md:flex items-center gap-3 lg:gap-6">
          {links.map((link) => (
            <NavLink key={link.label} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* RIGHT: Auth/Profile */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="hidden sm:flex items-center gap-4">
            <ThemeToggle />

            {!user ? (
              <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-700/60 pl-4 ml-1">
                <Link
                  to="/auth/login"
                  className="text-[14px] font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/dashboard/farmer/crops/add"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-700 dark:bg-emerald-600 hover:bg-emerald-800 dark:hover:bg-emerald-500 px-5 py-2 text-[14px] font-semibold text-white shadow-sm active:scale-95 transition-all duration-200"
                >
                  Become a Seller
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-700/60 pl-4 ml-1">
                {/* <button className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 relative">
                  <Bell className="h-4.5 w-4.5" />
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full border border-white dark:border-slate-900" />
                </button> */}
                <Link
                  to="/dashboard"
                  className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                  title="Dashboard"
                >
                  <LayoutDashboard className="h-4.5 w-4.5" />
                </Link>

                <div className="dropdown dropdown-end">
                  <button
                    tabIndex={0}
                    className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 dark:focus:ring-offset-slate-900"
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
                    className="menu dropdown-content mt-3 w-56 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-2 shadow-xl dark:shadow-black/40"
                  >
                    <li className="mb-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 px-3 py-2.5">
                      <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {user.displayName || "User"}
                      </p>
                      <p className="truncate text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {user.email}
                      </p>
                    </li>
                    <li className="px-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/20 transition-colors w-full"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 focus:outline-none transition-colors ml-2"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* MOBILE NAV PANEL */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto absolute top-[80px] inset-x-4 sm:inset-x-6 mx-auto max-w-7xl rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-xl border border-slate-200/80 dark:border-slate-800/80 p-5 md:hidden"
          >
            <div className="flex flex-col gap-4">
              <nav className="flex flex-col gap-1.5">
                {links.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    className={({ isActive }) =>
                      [
                        "rounded-xl px-4 py-3 text-[15px] transition-colors",
                        isActive
                          ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 font-semibold"
                          : "font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100",
                      ].join(" ")
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              <div className="border-t border-slate-200 dark:border-slate-800 my-1" />

              <div className="flex items-center justify-between px-2 mb-2">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Theme</span>
                <ThemeToggle />
              </div>

              {!user ? (
                <div className="flex flex-col gap-2.5">
                  <Link
                    to="/auth/login"
                    className="flex justify-center rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-3 text-[14px] font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/dashboard/farmer/crops/add"
                    className="flex justify-center rounded-xl bg-emerald-700 dark:bg-emerald-600 px-4 py-3 text-[14px] font-semibold text-white shadow-sm transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Become a Seller
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-3 px-2 py-1 mb-2">
                    <img
                      alt={user.displayName}
                      referrerPolicy="no-referrer"
                      src={user.photoURL || "https://static.vecteezy.com/system/resources/previews/007/296/447/non_2x/user-icon-in-flat-style-person-icon-client-symbol-vector.jpg"}
                      className="h-10 w-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{user.displayName || "User"}</p>
                      <p className="text-[12px] text-slate-500 dark:text-slate-400">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-3 text-[14px] font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <LayoutDashboard className="h-4.5 w-4.5" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex justify-center items-center gap-2 rounded-xl bg-rose-50 dark:bg-rose-900/20 px-4 py-3 text-[14px] font-semibold text-rose-600 dark:text-rose-400 transition-colors"
                  >
                    <LogOut className="h-4.5 w-4.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
