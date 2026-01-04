import React, { useContext, useMemo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../Context/AuthProvider";
import { toast } from "react-toastify";
import { syncUserToBackend } from "../utils/syncUserToBackend";
import useAxiosSecure from "../Hooks/useAxios";

const Register = () => {
  const { createUser, setUser, updateUser } = useContext(AuthContext);
  const instance = useAxiosSecure();

  const [show, setShow] = useState(false);
  const [error, setError] = useState(""); // human-friendly message
  const [submitting, setSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const firebaseErrorMessage = useMemo(() => {
    const map = {
      "auth/email-already-in-use":
        "This email is already in use. Try logging in.",
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/weak-password":
        "Password is too weak. Please choose a stronger one.",
      "auth/network-request-failed":
        "Network error. Check your internet connection and try again.",
      "auth/too-many-requests": "Too many attempts. Please try again later.",
    };
    return (code) => map[code] || "Registration failed. Please try again.";
  }, []);

  const validate = ({ name, email, password, acceptedTerms }) => {
    const n = name.trim();
    const e = email.trim();

    if (!n) return "Name is required.";
    if (n.length < 2) return "Name must be at least 2 characters.";
    if (!e) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(e)) return "Please enter a valid email address.";

    // Your existing rules (kept)
    if (!password) return "Password is required.";
    if (password.length < 6)
      return "Password must be at least 6 characters long.";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(password))
      return "Password must contain at least one lowercase letter.";

    if (!acceptedTerms)
      return "You must accept the Terms & Conditions to register.";

    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;

    const name = form.name.value.trim();
    const image = form.image.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    const validationError = validate({ name, email, password, acceptedTerms });
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);

      // 1) Create Firebase account
      const result = await createUser(email, password);

      // 2) Update Firebase profile (name/photo)
      try {
        await updateUser({
          displayName: name,
          photoURL: image || undefined, // avoid saving empty string
        });

        // 3) Sync AuthContext user state
        setUser({
          ...result.user,
          displayName: name,
          photoURL: image || result.user.photoURL,
        });
      } catch (profileErr) {
        console.error("Profile update failed:", profileErr);
        // Don’t stop registration; user can update later
        toast.error("Account created, but profile update failed.");
      }

      // 4) Sync MongoDB user (role defaults to buyer)
      try {
        // IMPORTANT: use Firebase user from result, token is valid
        await syncUserToBackend(result.user, instance);
      } catch (syncErr) {
        console.error("Backend user sync failed:", syncErr);
        // Don’t block navigation—account is created successfully
        toast.error("Account created, but failed to sync profile to server.");
      }

      toast.success("Sign up successful!");
      navigate(location.state ? location.state : "/");
    } catch (err) {
      console.error("Signup failed:", err);
      setError(firebaseErrorMessage(err?.code));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-64px)] bg-[var(--color-bg)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl">
          {/* Header */}
          <div className="px-6 pt-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)]">
              Create your account
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--color-muted)]">
              Join KrishiLink to post crops, manage interests, and connect with
              buyers.
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
          <form onSubmit={handleRegister} className="px-6 pb-7 pt-6 space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[var(--color-text)]">
                Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Your full name"
                required
                onChange={() => error && setError("")}
                autoComplete="name"
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm sm:text-base text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
              />
            </div>

            {/* Photo URL */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[var(--color-text)]">
                Photo URL{" "}
                <span className="text-[var(--color-muted)]">(optional)</span>
              </label>
              <input
                name="image"
                type="url"
                placeholder="https://example.com/your-photo.jpg"
                onChange={() => error && setError("")}
                autoComplete="photo"
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm sm:text-base text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[var(--color-text)]">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                onChange={() => error && setError("")}
                autoComplete="email"
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm sm:text-base text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[var(--color-text)]">
                Password
              </label>

              <div className="relative">
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  placeholder="Create a strong password"
                  required
                  onChange={() => error && setError("")}
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 pr-16 text-sm sm:text-base text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
                />
                <button
                  type="button"
                  onClick={() => setShow((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2.5 py-1 text-xs font-semibold text-[var(--color-secondary)] hover:bg-[color-mix(in_srgb,var(--color-secondary)_12%,transparent)]"
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? "Hide" : "Show"}
                </button>
              </div>

              {/* Password hint (professional UX) */}
              <p className="text-xs text-[var(--color-muted)]">
                Must be 6+ characters and include at least one uppercase and one
                lowercase letter.
              </p>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-1">
              <input
                id="kl-terms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => {
                  setAcceptedTerms(e.target.checked);
                  if (error) setError("");
                }}
                className="mt-1 h-4 w-4 rounded border border-[var(--color-border)] accent-[var(--color-primary)]"
              />
              <label
                htmlFor="kl-terms"
                className="text-sm text-[var(--color-muted)]"
              >
                I agree to the{" "}
                <a
                  href="/terms"
                  className="font-semibold text-[var(--color-primary)] hover:underline underline-offset-4"
                >
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="font-semibold text-[var(--color-primary)] hover:underline underline-offset-4"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-2.5 text-sm sm:text-base font-semibold text-white hover:brightness-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Creating account...
                </span>
              ) : (
                "Register"
              )}
            </button>

            {/* Footer link */}
            <p className="text-center text-sm sm:text-base text-[var(--color-muted)] pt-1">
              Already have an account?{" "}
              <Link
                className="font-semibold text-[var(--color-primary)] hover:underline underline-offset-4"
                to="/auth/login"
                state={location.state}
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
