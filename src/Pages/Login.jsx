import React, { useContext, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { syncUserToBackend } from "../utils/syncUserToBackend";
import useAxiosSecure from "../Hooks/useAxios";
import { getMeOrSync } from "../utils/getMeOrSync";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const instance = useAxiosSecure();
  const [error, setError] = useState(""); // human-friendly message
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const demoFarmerEmail = import.meta.env.VITE_DEMO_FARMER_EMAIL;
  const demoFarmerPassword = import.meta.env.VITE_DEMO_FARMER_PASSWORD;

  const demoAdminEmail = import.meta.env.VITE_DEMO_ADMIN_EMAIL;
  const demoAdminPassword = import.meta.env.VITE_DEMO_ADMIN_PASSWORD;

  const firebaseErrorMessage = useMemo(() => {
    const map = {
      "auth/invalid-credential": "Email or password is incorrect.",
      "auth/user-not-found": "No account found with this email.",
      "auth/wrong-password": "Email or password is incorrect.",
      "auth/user-disabled": "This account has been disabled. Contact support.",
      "auth/too-many-requests":
        "Too many attempts. Please try again later or reset your password.",
      "auth/network-request-failed":
        "Network error. Check your internet connection and try again.",
      "auth/invalid-email": "Please enter a valid email address.",
    };
    return (code) => map[code] || "Login failed. Please try again.";
  }, []);

  const validate = (email, password) => {
    const e = email.trim();
    if (!e) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(e)) return "Please enter a valid email address.";
    if (!password) return "Password is required.";
    if (String(password).length < 6)
      return "Password must be at least 6 characters.";
    return "";
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const validationError = validate(email, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);

      const result = await loginUser(email, password);
      toast.success("Login successful.");

      // ✅ read user profile (role/status) without rewriting every time
      try {
        await getMeOrSync(instance, result.user);
      } catch (profileErr) {
        console.error("Loading profile failed:", profileErr);
        toast.error("Logged in, but failed to load profile.");
      }

      navigate(location.state ? location.state : "/");
    } catch (err) {
      console.log(err?.code);
      setError(firebaseErrorMessage(err?.code));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");

    try {
      setGoogleSubmitting(true);

      const result = await googleLogin(); // ✅ capture result
      toast.success("Sign in successful.");

      try {
        await syncUserToBackend(result.user, instance);
      } catch (syncErr) {
        console.error("User sync failed:", syncErr);
        toast.error("Signed in, but failed to sync profile. Try again later.");
      }

      navigate(location.state ? location.state : "/");
    } catch (err) {
      console.log(err?.code);
      setError(firebaseErrorMessage(err?.code));
    } finally {
      setGoogleSubmitting(false);
    }
  };

  const handleDemoFarmerLogin = async () => {
    setError("");

    if (!demoFarmerEmail || !demoFarmerPassword) {
      toast.error("Demo farmer credentials are not configured.");
      return;
    }

    try {
      setSubmitting(true);
      const result = await loginUser(demoFarmerEmail, demoFarmerPassword);

      // Ensure DB user exists / loaded
      await getMeOrSync(instance, result.user);

      toast.success("Logged in as Demo Farmer.");
      navigate(location.state ? location.state : "/dashboard");
    } catch (err) {
      console.error(err);
      setError(firebaseErrorMessage(err?.code));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoAdminLogin = async () => {
    setError("");

    if (!demoAdminEmail || !demoAdminPassword) {
      toast.error("Demo admin credentials are not configured.");
      return;
    }

    const resultConfirm = await Swal.fire({
      title: "Proceed with Admin Demo?",
      text: "You are about to enter with limited admin privileges. To protect the integrity of the platform, certain administrative functions are restricted. Proceed?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2F855A", // matches your primary
      cancelButtonColor: "#8B5E34", // secondary
    });

    if (!resultConfirm.isConfirmed) return;

    try {
      setSubmitting(true);
      const result = await loginUser(demoAdminEmail, demoAdminPassword);

      await getMeOrSync(instance, result.user);

      toast.success("Logged in as Demo Admin.");
      navigate(location.state ? location.state : "/dashboard");
    } catch (err) {
      console.error(err);
      setError(firebaseErrorMessage(err?.code));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className="min-h-[calc(100vh-64px)] 
    bg-(--color-bg) flex items-center 
    justify-center px-4 py-10"
    >
      {/* ── Login Card entrance animation ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div
          className="rounded-2xl border 
        border-(--color-border) 
        bg-(--color-surface) shadow-xl"
        >
          {/* Header */}
          <div className="px-6 pt-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-(--color-text)">
              Login to KrishiLink
            </h2>
            <p className="mt-2 text-sm sm:text-base text-(--color-muted)">
              Access your dashboard and manage your crops and interests.
            </p>
          </div>

          {/* Error */}
          {error ? (
            <div
              role="alert"
              aria-live="polite"
              className="mx-6 mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300"
            >
              {error}
            </div>
          ) : null}

          {/* Form */}
          <form onSubmit={handleLogin} className="px-6 pb-7 pt-6 space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-(--color-text)">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                onChange={() => error && setError("")}
                autoComplete="email"
                className="w-full rounded-xl border border-(--color-border) bg-(--color-surface) px-4 py-2.5 text-sm sm:text-base text-(--color-text) placeholder:text-(--color-muted) focus:outline-none focus:ring-4 focus:ring-(--color-primary)/20"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-(--color-text)">
                Password
              </label>

              <div className="relative">
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={() => error && setError("")}
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-(--color-border) bg-(--color-surface) px-4 py-2.5 pr-16 text-sm sm:text-base text-(--color-text) placeholder:text-(--color-muted) focus:outline-none focus:ring-4 focus:ring-(--color-primary)/20"
                />

                <button
                  type="button"
                  onClick={() => setShow((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2.5 py-1 text-xs font-semibold text-(--color-secondary) hover:bg-[color-mix(in_srgb,var(--color-secondary)_12%,transparent)]"
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? "Hide" : "Show"}
                </button>
              </div>

              <div className="flex items-center justify-end">
                {/* Kept functional + professional: mailto instead of Gmail inbox */}
                <a
                  href="mailto:hello@krishilink.app?subject=Password%20Reset%20Help"
                  className="text-sm font-medium text-(--color-primary) hover:underline underline-offset-4"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting || googleSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-(--color-primary) px-4 py-2.5 text-sm sm:text-base font-semibold text-white hover:brightness-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-1">
              <div className="h-px w-full bg-(--color-border)" />
              <span className="text-xs font-semibold text-(--color-muted)">
                OR
              </span>
              <div className="h-px w-full bg-(--color-border)" />
            </div>

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={submitting || googleSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-(--color-border) bg-(--color-surface) px-4 py-2.5 text-sm sm:text-base font-semibold text-(--color-text) hover:bg-[color-mix(in_srgb,var(--color-primary)_8%,var(--color-surface))] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {googleSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-(--color-muted)/40 border-t-(--color-primary)" />
                  Connecting...
                </span>
              ) : (
                <>
                  <FcGoogle size={22} />
                  Sign in with Google
                </>
              )}
            </button>
            {/* Demo Login Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleDemoFarmerLogin}
                disabled={submitting || googleSubmitting}
                className="w-full rounded-xl border border-(--color-primary) px-4 py-2.5 text-sm font-semibold text-(--color-primary)
    hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Login as Farmer
              </button>

              <button
                type="button"
                onClick={handleDemoAdminLogin}
                disabled={submitting || googleSubmitting}
                className="w-full rounded-xl border border-(--color-secondary) px-4 py-2.5 text-sm font-semibold text-(--color-secondary)
    hover:bg-[color-mix(in_srgb,var(--color-secondary)_10%,transparent)] transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Login as Admin
              </button>
            </div>
            {/* Register */}
            <p className="text-center text-sm sm:text-base text-(--color-muted) pt-1">
              Don&apos;t have an account?{" "}
              <Link
                className="font-semibold text-(--color-primary) hover:underline underline-offset-4"
                to="/auth/register"
                state={location.state}
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Login;

