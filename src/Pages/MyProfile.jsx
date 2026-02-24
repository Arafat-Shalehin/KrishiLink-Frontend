import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { toast } from "react-toastify";
import useAuthProfile from "../Hooks/useAuthProfile";
import useAxiosSecure from "../Hooks/useAxios";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Shield,
  Activity,
  FileText,
  Heart,
  Camera,
  Edit2,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react";

// Reusable Stat Card Component
const StatCard = ({ title, value, to, icon: Icon, colorClass }) => {
  return (
    <Link to={to} className="block group">
      <motion.div
        whileHover={{ y: -4 }}
        /* ── Profile stat card: uses theme variables for consistent dark mode support ── */
        className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-md hover:shadow-xl transition-all duration-300"
      >
        <div
          className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform scale-150`}
        >
          <Icon className={`w-24 h-24 ${colorClass}`} />
        </div>
        <div className="flex items-center gap-4 relative z-10">
          <div
            className={`p-3 rounded-xl bg-[var(--color-bg)] shadow-inner ${colorClass}`}
          >
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--color-muted)]">{title}</p>
            <p className="text-2xl font-bold text-[var(--color-text)] mt-1 group-hover:translate-x-1 transition-transform">
              {value}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const MyProfile = () => {
  const { user, updateUser, setUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { dbUser, loading: profileLoading, refetch } = useAuthProfile(user);

  const [statsLoading, setStatsLoading] = useState(false);
  const [stats, setStats] = useState({ myPostsCount: 0, myInterestsCount: 0 });

  const farmerStatus = dbUser?.farmerRequest?.status || "none";
  const role = dbUser?.role || "—";

  const statusConfig = useMemo(() => {
    switch (farmerStatus) {
      case "pending":
        return {
          color:
            "text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-900/50",
          icon: AlertCircle,
          label: "Pending Approval",
        };
      case "approved":
        return {
          color:
            "text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-900/50",
          icon: CheckCircle2,
          label: "Verified Farmer",
        };
      case "rejected":
        return {
          color:
            "text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-900/50",
          icon: XCircle,
          label: "Request Rejected",
        };
      case "cancelled":
        return {
          color:
            "text-gray-500 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700",
          icon: XCircle,
          label: "Cancelled",
        };
      default:
        return {
          color:
            "text-gray-500 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700",
          icon: Shield,
          label: "No Request",
        };
    }
  }, [farmerStatus]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const image = form.image.value.trim();

    updateUser({
      displayName: name || user.displayName,
      photoURL: image || user.photoURL,
    })
      .then(() => {
        setUser({
          ...user,
          displayName: name || user.displayName,
          photoURL: image || user.photoURL,
        });
        document.getElementById("profile_update_modal").close();
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!");
        setUser(user);
      });
  };

  const handleRequestFarmer = async () => {
    try {
      await axiosSecure.post("/users/request-farmer");
      toast.success("Farmer request submitted.");
      refetch();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to submit request.");
    }
  };

  const handleCancelRequest = async () => {
    try {
      await axiosSecure.patch("/users/request-farmer/cancel");
      toast.success("Request cancelled.");
      refetch();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to cancel request.");
    }
  };

  const canRequestFarmer =
    role === "buyer" &&
    farmerStatus !== "pending" &&
    farmerStatus !== "rejected" &&
    farmerStatus !== "approved"; // Added approved check just in case

  const canCancelRequest = role === "buyer" && farmerStatus === "pending";

  // ✅ Fetch stats (posts count + interests count)
  useEffect(() => {
    if (!user?.email) return;

    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        const res = await axiosSecure.get("/users/me/stats");
        setStats(res.data?.stats || { myPostsCount: 0, myInterestsCount: 0 });
      } catch (err) {
        console.error(err);
        // toast.error("Failed to load profile stats."); // Silent fail is better for UX here
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, [user?.email, axiosSecure]);

  return (
    <div className="min-h-screen bg-background/50 p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        /* ── Explicit transition ensures consistency with other page components ── */
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-6xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Profile Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your account settings and preferences.
            </p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-lg">
          {/* Cover gradient */}
          <div className="h-32 w-full bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-900 dark:to-teal-900"></div>

          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-background rounded-full m-1"></div>
                <img
                  src={
                    user?.photoURL ||
                    "https://i.fbcd.co/products/resized/resized-1500-1000/d4c961732ba6ec52c0bbde63c9cb9e5dd6593826ee788080599f68920224e27d.webp"
                  }
                  alt="Profile"
                  className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover border-4 border-background shadow-xl"
                />
                <button
                  onClick={() =>
                    document.getElementById("profile_update_modal").showModal()
                  }
                  className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              <div className="hidden sm:block">
                <button
                  onClick={() =>
                    document.getElementById("profile_update_modal").showModal()
                  }
                  className="px-6 py-2 bg-secondary text-secondary-foreground font-semibold rounded-full hover:bg-secondary/80 transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                {user?.displayName || "No Name"}
                <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary rounded-full border border-primary/20">
                  {role}
                </span>
              </h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                {user?.email}
              </div>
            </div>
          </div>
        </div>

        {/* Status & Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Farmer Status Card */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-emerald-500" />
              Account Status
            </h3>

            <div
              className={`p-4 rounded-xl border ${statusConfig.color} flex items-center gap-3 mb-6`}
            >
              <statusConfig.icon className="w-6 h-6" />
              <div>
                <p className="font-semibold">{statusConfig.label}</p>
                <p className="text-xs opacity-80">
                  {farmerStatus === "pending"
                    ? "Wait for admin approval."
                    : farmerStatus === "approved"
                      ? "You have full access."
                      : "Update your role to access more features."}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {canRequestFarmer && (
                <button
                  onClick={handleRequestFarmer}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/20"
                >
                  Request Farmer Access
                </button>
              )}
              {canCancelRequest && (
                <button
                  onClick={handleCancelRequest}
                  className="w-full py-2.5 border border-red-200 text-red-600 hover:bg-red-50 font-semibold rounded-xl transition-all"
                >
                  Cancel Request
                </button>
              )}
              {!canRequestFarmer &&
                !canCancelRequest &&
                farmerStatus !== "approved" && (
                  <div className="text-sm text-center text-muted-foreground py-2">
                    No actions available right now.
                  </div>
                )}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 gap-6">
            <StatCard
              title={
                role === "buyer"
                  ? "Purchased Orders"
                  : role === "farmer"
                    ? "My Crops"
                    : "Blocked Users"
              }
              value={
                statsLoading
                  ? "..."
                  : role === "buyer"
                    ? stats.purchasedCount
                    : role === "farmer"
                      ? stats.myPostsCount
                      : stats.blockedUsersCount
              }
              to={
                role === 'admin' ? '/dashboard/admin/users' :
                  role === 'farmer' ? '/dashboard/my-crops' :
                    '/my-posts' // buyers see their activity here (or maybe a purchase history page?)
              }
              icon={FileText}
              colorClass="text-blue-500"
            />
            <StatCard
              title={
                role === "buyer"
                  ? "Sent Interests"
                  : role === "farmer"
                    ? "Received Interests"
                    : "Farmer Requests"
              }
              value={
                statsLoading
                  ? "..."
                  : role === "buyer"
                    ? stats.myInterestsCount
                    : role === "farmer"
                      ? stats.receivedInterestsCount
                      : stats.farmerRequestsCount
              }
              to={
                role === 'admin' ? '/dashboard/admin/users' :
                  '/my-interest'
              }
              icon={Heart}
              colorClass="text-rose-500"
            />
          </div>
        </div>
      </motion.div>

      {/* Edit Modal */}
      <dialog
        id="profile_update_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box rounded-3xl p-0 overflow-hidden bg-card">
          <div className="p-6 border-b border-border bg-muted/30">
            <h3 className="font-bold text-xl">Edit Profile</h3>
            <p className="text-sm text-muted-foreground">
              Make changes to your public profile.
            </p>
          </div>

          <form onSubmit={handleUpdateProfile} className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <User className="w-4 h-4" /> Name
              </label>
              <input
                name="name"
                type="text"
                defaultValue={user?.displayName}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Camera className="w-4 h-4" /> Photo URL
              </label>
              <input
                name="image"
                type="text"
                defaultValue={user?.photoURL}
                placeholder="https://example.com/photo.jpg"
                className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>

            <div className="pt-4 flex gap-3">
              <button className="flex-1 bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity">
                Save Changes
              </button>
            </div>
          </form>

          <form method="dialog" className="px-6 pb-6">
            <button className="w-full py-3 font-semibold text-muted-foreground hover:bg-muted/50 rounded-xl transition-colors">
              Cancel
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default MyProfile;
