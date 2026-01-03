import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAxios from "../Hooks/useAxios";
import { toast } from "react-toastify";
import MyInterestSkeleton from "../Components/Skeleton/MyInterestSkeleton";

const MyInterest = () => {
  const { user } = useContext(AuthContext);
  const instance = useAxios();
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);

    instance
      .get(`/myInterests?email=${user.email}`)
      .then((res) => {
        setInterests(res.data.interests || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load interests!");
        setLoading(false);
      });
  }, [user, instance]);

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "text-[var(--color-primary)] bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] border-[color-mix(in_srgb,var(--color-primary)_25%,transparent)]";
      case "rejected":
        return "text-red-700 bg-red-50 border-red-200 dark:text-red-300 dark:bg-red-900/20 dark:border-red-900/40";
      default:
        return "text-[var(--color-secondary)] bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)] border-[color-mix(in_srgb,var(--color-accent)_30%,transparent)]";
    }
  };

  if (loading) {
    return <MyInterestSkeleton rows={6} />;
  }

  return (
    <section className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="mt-10 text-2xl sm:text-3xl font-bold mb-6 text-center text-[var(--color-text)]">
          My <span className="text-[var(--color-primary)]">Interests</span>
        </h2>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm sm:text-base text-[var(--color-muted)] font-semibold">
            Total Interest:{" "}
            <span className="text-[var(--color-text)]">{interests.length}</span>
          </p>
          <div></div>
        </div>

        <div className="overflow-x-auto bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl rounded-2xl p-4">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-bg))] text-[var(--color-text)]">
                <th className="py-3 px-4 font-semibold">Crop</th>
                <th className="py-3 px-4 font-semibold">Owner</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Quantity</th>
                <th className="py-3 px-4 font-semibold">Message</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {interests.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-10 text-center text-[var(--color-muted)]"
                  >
                    You haven’t shown interest in any crops yet.
                  </td>
                </tr>
              ) : (
                interests.map((interest) => (
                  <tr
                    key={interest._id}
                    className="border-b border-[var(--color-border)] hover:bg-[color-mix(in_srgb,var(--color-primary)_6%,transparent)] transition-all duration-200"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            interest.cropImage ||
                            "https://via.placeholder.com/50"
                          }
                          alt={interest.cropName}
                          className="w-12 h-12 object-cover rounded-lg border border-[var(--color-border)]"
                        />
                        <div>
                          <p className="font-semibold text-[var(--color-text)]">
                            {interest.cropName}
                          </p>
                          <p className="text-xs text-[var(--color-muted)]">
                            {interest.cropLocation}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-[var(--color-text)]/90">
                      {interest.ownerName}
                    </td>

                    <td className="py-3 px-4 text-[var(--color-muted)]">
                      {interest.cropType}
                    </td>

                    <td className="py-3 px-4 text-[var(--color-text)]/90 font-semibold">
                      {interest.quantity}
                    </td>

                    <td className="py-3 px-4 text-[var(--color-text)]/90 italic">
                      {interest.message || "—"}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border capitalize ${getStatusColor(
                          interest.status
                        )}`}
                      >
                        {interest.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MyInterest;
