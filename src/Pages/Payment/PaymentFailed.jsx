import { useSearchParams, Link } from "react-router";
import { XCircle, RefreshCw, Home, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const PaymentFailed = () => {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const error = searchParams.get("error");

  return (
    <section className="min-h-screen bg-(--color-bg) flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-(--color-surface) rounded-3xl shadow-2xl border border-(--color-border) overflow-hidden"
      >
        {/* Failed Header */}
        <div className="bg-linear-to-br from-red-500 to-red-600 p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg"
          >
            <XCircle className="w-12 h-12 text-red-500" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-2xl sm:text-3xl font-bold text-white"
          >
            Payment Failed
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-red-100"
          >
            Your transaction could not be completed
          </motion.p>
        </div>

        {/* Error Details */}
        <div className="p-6 sm:p-8">
          {/* Error Message */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/40 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-700 dark:text-red-300">
                  What happened?
                </h3>
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {error || "The payment could not be processed. This could be due to insufficient funds, incorrect card details, or a network issue."}
                </p>
              </div>
            </div>
          </div>

          {transactionId && (
            <div className="flex items-center justify-between py-3 border-b border-(--color-border) mb-4">
              <span className="text-(--color-muted) font-medium">Transaction ID</span>
              <span className="text-sm font-mono text-(--color-text) bg-(--color-bg) px-2 py-1 rounded">
                {transactionId.slice(0, 20)}...
              </span>
            </div>
          )}

          {/* Suggestions */}
          <div className="space-y-2 mb-6">
            <p className="text-sm font-semibold text-(--color-text)">You can try:</p>
            <ul className="text-sm text-(--color-muted) space-y-1 list-disc list-inside">
              <li>Using a different payment method</li>
              <li>Checking your card/account balance</li>
              <li>Contacting your bank if the issue persists</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              to="/dashboard/buyer/interests"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-amber-500/25"
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

        {/* Footer Note */}
        <div className="px-6 pb-6 sm:px-8 sm:pb-8">
          <p className="text-center text-sm text-(--color-muted)">
            Need help? Contact our support at support@krishilink.com
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default PaymentFailed;
