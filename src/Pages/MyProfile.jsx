import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { toast } from "react-toastify";
import useAuthProfile from "../Hooks/useAuthProfile";
import useAxiosSecure from "../Hooks/useAxios";
import { Link } from "react-router";

const StatCard = ({ title, value, to }) => {
  return (
    <Link
      to={to}
      className="block rounded-2xl border border-(--color-border) bg-(--color-surface) p-5 shadow-sm transition
      hover:shadow-md hover:border-[color-mix(in_srgb,var(--color-primary)_35%,transparent)
      focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      <p className="text-sm font-semibold text-(--color-muted)">{title}</p>
      <p className="mt-2 text-3xl font-extrabold text-(--color-text)">
        {value}
      </p>
      <p className="mt-1 text-xs text-(--color-muted)">Tap to view</p>
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

  const statusBadgeClass = useMemo(() => {
    switch (farmerStatus) {
      case "pending":
        return "border-[color-mix(in_srgb,var(--color-accent)_40%,transparent) bg-[color-mix(in_srgb,var(--color-accent)_18%,transparent) text-(--color-text)";
      case "approved":
        return "border-[color-mix(in_srgb,var(--color-primary)_40%,transparent) bg-[color-mix(in_srgb,var(--color-primary)_14%,transparent) text-(--color-primary)";
      case "rejected":
        return "border-red-200 bg-red-50 text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300";
      case "cancelled":
        return "border-(--color-border) bg-(--color-bg) text-(--color-muted)";
      default:
        return "border-(--color-border) bg-(--color-bg) text-(--color-muted)";
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
        document.getElementById("my_modal_1").close();
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
    farmerStatus !== "rejected";
  const canCancelRequest = role === "buyer" && farmerStatus === "pending";

  // ✅ Fetch stats (posts count + interests count)
  useEffect(() => {
    if (!user?.email) return;

    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        const res = await axiosSecure.get("/users/me/stats");
        // console.log(res.data);
        setStats(res.data?.stats || { myPostsCount: 0, myInterestsCount: 0 });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile stats.");
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, [user?.email, axiosSecure]);

  return (
    <section className="min-h-[calc(100vh-64px) py-10 px-4">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-center text-2xl sm:text-3xl font-bold text-(--color-text)">
          My <span className="text-(--color-primary)">Profile</span>
        </h1>
        <p className="mt-2 text-center text-sm sm:text-base text-(--color-muted)">
          Manage your profile, access level, and activity.
        </p>

        {/* Top grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Profile Card */}
          <div className="lg:col-span-1 rounded-2xl border border-(--color-border) bg-(--color-surface) shadow-xl p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <img
                src={
                  user?.photoURL ||
                  "https://i.fbcd.co/products/resized/resized-1500-1000/d4c961732ba6ec52c0bbde63c9cb9e5dd6593826ee788080599f68920224e27d.webp"
                }
                alt="Profile"
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border-4 border-[color-mix(in_srgb,var(--color-primary)_35%,transparent)"
              />

              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider text-(--color-muted)">
                  Signed in as
                </p>
                <h2 className="truncate text-lg sm:text-xl font-semibold text-(--color-text)">
                  {user?.displayName || "No name"}
                </h2>
                <p className="truncate text-sm text-(--color-muted)">
                  {user?.email || "No email"}
                </p>
              </div>
            </div>

            <button
              className="mt-6 w-full rounded-xl bg-(--color-primary) hover:brightness-95 text-white font-semibold py-2.5 transition
              focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              Update Profile
            </button>
          </div>

          {/* Role / Request Card */}
          <div className="lg:col-span-2 rounded-2xl border border-(--color-border) bg-(--color-surface) shadow-xl p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-bold text-(--color-text)">
              Account & Access
            </h3>
            <p className="mt-1 text-sm text-(--color-muted)">
              Role controls dashboard permissions. Farmer access requires
              approval.
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-(--color-border) bg-(--color-bg) p-4">
                <p className="text-sm font-semibold text-(--color-muted)">
                  Current role
                </p>
                <p className="mt-2 text-xl font-bold text-(--color-text)">
                  {profileLoading ? "Loading..." : role}
                </p>
              </div>

              <div className="rounded-xl border border-(--color-border) bg-(--color-bg) p-4">
                <p className="text-sm font-semibold text-(--color-muted)">
                  Farmer request
                </p>
                <div className="mt-2">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize ${statusBadgeClass}`}
                  >
                    {profileLoading ? "loading" : farmerStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {canRequestFarmer && (
                <button
                  onClick={handleRequestFarmer}
                  className="w-full rounded-xl bg-(--color-primary) px-4 py-2.5 text-sm font-semibold text-white hover:brightness-95 transition"
                >
                  Request Farmer Access
                </button>
              )}

              {canCancelRequest && (
                <button
                  onClick={handleCancelRequest}
                  className="w-full rounded-xl border border-(--color-secondary) px-4 py-2.5 text-sm font-semibold text-(--color-secondary) hover:bg-[color-mix(in_srgb,var(--color-secondary)_10%,transparent) transition"
                >
                  Cancel Request
                </button>
              )}
            </div>

            {role === "buyer" && farmerStatus === "pending" && (
              <p className="mt-3 text-xs text-(--color-muted)">
                Your request is pending. You will get farmer access after
                approval.
              </p>
            )}
            {role === "buyer" && farmerStatus === "cancelled" && (
              <p className="mt-3 text-xs text-(--color-muted)">
                You cancelled your request. You can request again anytime.
              </p>
            )}
            {role === "buyer" && farmerStatus === "rejected" && (
              <p className="mt-3 text-xs text-(--color-muted)">
                Your request was rejected. You can request again later.
              </p>
            )}
          </div>
        </div>

        {/* Activity Stats */}
        <div className="mt-6">
          <h3 className="text-lg sm:text-xl font-bold text-(--color-text)">
            Activity
          </h3>
          <p className="mt-1 text-sm text-(--color-muted)">
            Quick links to your posts and interests.
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <StatCard
              title="My Posts"
              value={statsLoading ? "…" : stats.myPostsCount}
              to="/my-posts"
            />
            <StatCard
              title={role === "farmer" ? "Received Interests" : "My Interests"}
              value={statsLoading ? "…" : stats.myInterestsCount}
              to="/my-interest"
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box rounded-2xl border border-(--color-border) bg-(--color-surface) text-(--color-text)">
          <h3 className="text-lg sm:text-xl font-bold mb-4">
            Update profile details
          </h3>

          <form className="flex flex-col gap-4" onSubmit={handleUpdateProfile}>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-(--color-text)">
                Name
              </label>
              <input
                name="name"
                type="text"
                className="w-full rounded-xl border border-(--color-border) bg-(--color-surface) px-4 py-2.5 text-sm sm:text-base text-(--color-text) placeholder:text-(--color-muted) focus:outline-none focus:ring-4 focus:ring-(--color-primary)/20"
                placeholder="Enter your new name"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-(--color-text)">
                Photo URL
              </label>
              <input
                name="image"
                type="text"
                className="w-full rounded-xl border border-(--color-border) bg-(--color-surface) px-4 py-2.5 text-sm sm:text-base text-(--color-text) placeholder:text-(--color-muted) focus:outline-none focus:ring-4 focus:ring-(--color-primary)/20"
                placeholder="Paste your image URL"
              />
              <p className="text-xs text-(--color-muted)">
                Leave fields empty to keep current info.
              </p>
            </div>

            <button
              className="w-full mt-1 bg-(--color-primary) hover:brightness-95 text-white text-sm sm:text-base font-semibold py-2.5 rounded-xl transition
              focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              type="submit"
            >
              Save Changes
            </button>
          </form>

          <div className="modal-action">
            <form method="dialog" className="w-full">
              <button className="w-full rounded-xl border border-(--color-secondary) text-(--color-secondary) bg-transparent hover:bg-[color-mix(in_srgb,var(--color-secondary)_10%,transparent) text-sm sm:text-base font-semibold py-2.5 transition">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default MyProfile;
