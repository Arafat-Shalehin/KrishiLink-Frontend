import { useSearchParams, Link } from "react-router";
import { CheckCircle, ArrowRight, Receipt, Home } from "lucide-react";
import { motion } from "framer-motion";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const amount = searchParams.get("amount");

  return (
    <section className="min-h-screen bg-(--color-bg) flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-(--color-surface) rounded-3xl shadow-2xl border border-(--color-border) overflow-hidden"
      >
        {/* Success Header */}
        <div className="bg-linear-to-br from-emerald-500 to-emerald-600 p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg"
          >
            <CheckCircle className="w-12 h-12 text-emerald-500" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-2xl sm:text-3xl font-bold text-white"
          >
            Payment Successful!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-2 text-emerald-100"
          >
            Your transaction has been completed
          </motion.p>
        </div>

        {/* Payment Details */}
        <div className="p-6 sm:p-8">
          <div className="space-y-4">
            {amount && (
              <div className="flex items-center justify-between py-3 border-b border-(--color-border)">
                <span className="text-(--color-muted) font-medium">Amount Paid</span>
                <span className="text-2xl font-bold text-(--color-primary)">
                  ৳{Number(amount).toLocaleString()}
                </span>
              </div>
            )}
            
            {transactionId && (
              <div className="flex items-center justify-between py-3 border-b border-(--color-border)">
                <span className="text-(--color-muted) font-medium">Transaction ID</span>
                <span className="text-sm font-mono text-(--color-text) bg-(--color-bg) px-2 py-1 rounded">
                  {transactionId.slice(0, 20)}...
                </span>
              </div>
            )}

            <div className="flex items-center justify-between py-3">
              <span className="text-(--color-muted) font-medium">Status</span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                <CheckCircle className="w-4 h-4" />
                Completed
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 space-y-3">
            <Link
              to="/dashboard/buyer/purchases"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
            >
              <Receipt className="w-5 h-5" />
              View My Purchases
              <ArrowRight className="w-4 h-4" />
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
            A confirmation has been sent to your email. Thank you for using KrishiLink!
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default PaymentSuccess;
