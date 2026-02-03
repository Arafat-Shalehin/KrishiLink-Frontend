import { useSearchParams, Link } from "react-router";
import { Ban, ArrowLeft, Home, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const PaymentCancelled = () => {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("transactionId");

  return (
    <section className="min-h-screen bg-(--color-bg) flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-(--color-surface) rounded-3xl shadow-2xl border border-(--color-border) overflow-hidden"
      >
        {/* Cancelled Header */}
        <div className="bg-linear-to-br from-gray-500 to-gray-600 p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg"
          >
            <Ban className="w-12 h-12 text-gray-500" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-2xl sm:text-3xl font-bold text-white"
          >
            Payment Cancelled
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-gray-200"
          >
            You cancelled the payment process
          </motion.p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <p className="text-(--color-muted)">
              No worries! Your order is still saved. You can complete the payment
              whenever you're ready.
            </p>
          </div>

          {transactionId && (
            <div className="flex items-center justify-between py-3 border-b border-(--color-border) mb-6">
              <span className="text-(--color-muted) font-medium">Reference ID</span>
              <span className="text-sm font-mono text-(--color-text) bg-(--color-bg) px-2 py-1 rounded">
                {transactionId.slice(0, 20)}...
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <Link
              to="/dashboard/buyer/interests"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
            >
              <ShoppingCart className="w-5 h-5" />
              Back to My Interests
            </Link>
            
            <Link
              to="/all-crops"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-(--color-bg) hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] text-(--color-text) font-semibold rounded-xl transition-all duration-300 border border-(--color-border)"
            >
              <ArrowLeft className="w-5 h-5" />
              Browse More Crops
            </Link>

            <Link
              to="/"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 text-(--color-muted) hover:text-(--color-text) font-medium transition-all duration-300"
            >
              <Home className="w-5 h-5" />
              Go to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PaymentCancelled;
