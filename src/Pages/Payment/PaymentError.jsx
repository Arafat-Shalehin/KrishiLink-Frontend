import { useSearchParams, Link } from "react-router";
import { AlertOctagon, Home, RefreshCw, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const PaymentError = () => {
  const [searchParams] = useSearchParams();
  const message = searchParams.get("message");

  return (
    <section className="min-h-screen bg-(--color-bg) flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-(--color-surface) rounded-3xl shadow-2xl border border-(--color-border) overflow-hidden"
      >
        {/* Error Header */}
        <div className="bg-linear-to-br from-orange-500 to-orange-600 p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg"
          >
            <AlertOctagon className="w-12 h-12 text-orange-500" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-2xl sm:text-3xl font-bold text-white"
          >
            Something Went Wrong
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-orange-100"
          >
            We encountered an unexpected error
          </motion.p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {message && (
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-900/40 rounded-xl p-4 mb-6">
              <p className="text-sm text-orange-700 dark:text-orange-300">
                {message}
              </p>
            </div>
          )}

          <div className="text-center mb-6">
            <p className="text-(--color-muted)">
              Don't worry, no payment was processed. Please try again or contact
              support if the problem persists.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              to="/dashboard/buyer/interests"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </Link>

            <Link
              to="/"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-(--color-bg) hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] text-(--color-text) font-semibold rounded-xl transition-all duration-300 border border-(--color-border)"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 sm:px-8 sm:pb-8">
          <div className="flex items-center justify-center gap-2 text-sm text-(--color-muted)">
            <MessageCircle className="w-4 h-4" />
            <span>Need help? support@krishilink.com</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PaymentError;
