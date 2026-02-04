import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import useAxios from "../Hooks/useAxios";
import { usePayment } from "../Hooks/payments/usePayment";
import { toast } from "react-toastify";
import MyInterestSkeleton from "../Components/Skeleton/MyInterestSkeleton";
import { CreditCard, CheckCircle, Clock, XCircle, Loader2 } from "lucide-react";

const MyInterest = () => {
  const { user } = useContext(AuthContext);
  const instance = useAxios();
  const { initiatePayment, isLoading: paymentLoading } = usePayment();
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingInterestId, setPayingInterestId] = useState(null);

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);

    instance
      .get("/myInterests")
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
        return "text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-900/20 dark:border-emerald-900/40";
      case "rejected":
        return "text-red-700 bg-red-50 border-red-200 dark:text-red-300 dark:bg-red-900/20 dark:border-red-900/40";
      default:
        return "text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-300 dark:bg-amber-900/20 dark:border-amber-900/40";
    }
  };

  const getPaymentStatusBadge = (paymentStatus) => {
    switch (paymentStatus) {
      case "paid":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
            <CheckCircle className="w-3 h-3" />
            Paid
          </span>
        );
      case "awaiting_payment":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
            <Clock className="w-3 h-3" />
            Awaiting Payment
          </span>
        );
      default:
        return null;
    }
  };

  const handlePayment = async (interest) => {
    if (!interest.cropPrice) {
      toast.error("Price not available for this crop!");
      return;
    }

    setPayingInterestId(interest._id);
    
    const totalAmount = interest.quantity * interest.cropPrice;
    
    try {
      await initiatePayment({
        interestId: interest._id,
        amount: totalAmount,
        customerName: user?.displayName || "Customer",
        customerEmail: user?.email,
        customerPhone: "01700000000", // might want to get this from user profile
        customerAddress: interest.cropLocation || "Dhaka",
        customerCity: "Dhaka",
        customerPostCode: "1000",
      });
    } catch (error) {
      console.error("Payment initiation failed:", error);
      toast.error(error?.response?.data?.message || "Failed to initiate payment!");
      setPayingInterestId(null);
    }
  };

  if (loading) {
    return <MyInterestSkeleton rows={6} />;
  }

  return (
    <section className="min-h-screen text-(--color-text)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="mt-10 text-2xl sm:text-3xl font-bold mb-6 text-center text-(--color-text)">
          My <span className="text-(--color-primary)">Interests</span>
        </h2>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm sm:text-base text-(--color-muted) font-semibold">
            Total Interest:{" "}
            <span className="text-(--color-text)">{interests.length}</span>
          </p>
          <div></div>
        </div>

        {/* Mobile Card View */}
        <div className="block lg:hidden space-y-4">
          {interests.length === 0 ? (
            <div className="text-center py-10 text-(--color-muted) bg-(--color-surface) rounded-2xl border border-(--color-border)">
              You haven't shown interest in any crops yet.
            </div>
          ) : (
            interests.map((interest) => (
              <div
                key={interest._id}
                className="bg-(--color-surface) border border-(--color-border) rounded-2xl p-4 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={interest.cropImage || "https://via.placeholder.com/80"}
                    alt={interest.cropName}
                    className="w-20 h-20 object-cover rounded-xl border border-(--color-border)"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-(--color-text)">{interest.cropName}</h3>
                    <p className="text-sm text-(--color-muted)">{interest.cropLocation}</p>
                    <p className="text-sm text-(--color-muted)">Owner: {interest.ownerName}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusColor(interest.status)}`}>
                        {interest.status}
                      </span>
                      {getPaymentStatusBadge(interest.paymentStatus)}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-(--color-border)">
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <span className="text-(--color-muted)">Quantity:</span>
                      <span className="ml-1 font-semibold">{interest.quantity}</span>
                    </div>
                    <div>
                      <span className="text-(--color-muted)">Price/unit:</span>
                      <span className="ml-1 font-semibold">৳{interest.cropPrice || "N/A"}</span>
                    </div>
                    {interest.cropPrice && (
                      <div className="col-span-2">
                        <span className="text-(--color-muted)">Total:</span>
                        <span className="ml-1 font-bold text-(--color-primary)">
                          ৳{(interest.quantity * interest.cropPrice).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {interest.message && (
                    <p className="text-sm italic text-(--color-muted) mb-3">"{interest.message}"</p>
                  )}
                  
                  {/* Pay Button for accepted interests awaiting payment */}
                  {interest.status === "accepted" && interest.paymentStatus === "awaiting_payment" && (
                     interest.attemptCount >= 3 ? (
                      <div className="w-full px-4 py-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 text-sm font-semibold rounded-xl text-center border border-red-200 dark:border-red-800">
                        Max attempts reached. <br/> Contact Support.
                      </div>
                    ) : (
                    <button
                      onClick={() => handlePayment(interest)}
                      disabled={paymentLoading && payingInterestId === interest._id}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {paymentLoading && payingInterestId === interest._id ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          Pay ৳{(interest.quantity * interest.cropPrice).toLocaleString()}
                        </>
                      )}
                    </button>
                    )
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto bg-(--color-surface) border border-(--color-border) shadow-xl rounded-2xl p-4">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-[color-mix(in_srgb,var(--color-primary)_12%,var(--color-bg))] text-(--color-text)">
                <th className="py-3 px-4 font-semibold">Crop</th>
                <th className="py-3 px-4 font-semibold">Owner</th>
                <th className="py-3 px-4 font-semibold">Qty</th>
                <th className="py-3 px-4 font-semibold">Price</th>
                <th className="py-3 px-4 font-semibold">Total</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
                <th className="py-3 px-4 font-semibold text-center">Payment</th>
                <th className="py-3 px-4 font-semibold text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {interests.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="py-10 text-center text-(--color-muted)"
                  >
                    You haven't shown interest in any crops yet.
                  </td>
                </tr>
              ) : (
                interests.map((interest) => (
                  <tr
                    key={interest._id}
                    className="border-b border-(--color-border) hover:bg-[color-mix(in_srgb,var(--color-primary)_6%,transparent)] transition-all duration-200"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={interest.cropImage || "https://via.placeholder.com/50"}
                          alt={interest.cropName}
                          className="w-12 h-12 object-cover rounded-lg border border-(--color-border)"
                        />
                        <div>
                          <p className="font-semibold text-(--color-text)">
                            {interest.cropName}
                          </p>
                          <p className="text-xs text-(--color-muted)">
                            {interest.cropLocation}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-(--color-text)/90">
                      {interest.ownerName}
                    </td>

                    <td className="py-3 px-4 text-(--color-text)/90 font-semibold">
                      {interest.quantity}
                    </td>

                    <td className="py-3 px-4 text-(--color-muted)">
                      ৳{interest.cropPrice || "N/A"}
                    </td>

                    <td className="py-3 px-4 font-bold text-(--color-primary)">
                      {interest.cropPrice
                        ? `৳${(interest.quantity * interest.cropPrice).toLocaleString()}`
                        : "—"}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusColor(
                          interest.status
                        )}`}
                      >
                        {interest.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      {getPaymentStatusBadge(interest.paymentStatus) || (
                        <span className="text-(--color-muted)">—</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-center">
                      {interest.status === "accepted" && interest.paymentStatus === "awaiting_payment" ? (
                        interest.attemptCount >= 3 ? (
                          <span className="text-xs font-bold text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md cursor-help" title="Maximum payment attempts reached. Please contact support to reset.">
                            Contact Support
                          </span>
                        ) : (
                        <button
                          onClick={() => handlePayment(interest)}
                          disabled={paymentLoading && payingInterestId === interest._id}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {paymentLoading && payingInterestId === interest._id ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <CreditCard className="w-4 h-4" />
                              Pay Now
                            </>
                          )}
                        </button>
                        )
                      ) : interest.paymentStatus === "paid" ? (
                        <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          Completed
                        </span>
                      ) : interest.status === "rejected" ? (
                        <span className="inline-flex items-center gap-1 text-red-500">
                          <XCircle className="w-4 h-4" />
                          Rejected
                        </span>
                      ) : (
                        <span className="text-(--color-muted)">Pending</span>
                      )}
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
