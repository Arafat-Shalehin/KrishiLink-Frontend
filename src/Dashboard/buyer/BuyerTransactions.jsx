import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { useMyPayments } from "../../Hooks/payments/usePayment";
import { 
  Receipt,
  CheckCircle,
  XCircle,
  Clock,
  Ban,
  CreditCard,
  Calendar,
  ArrowUpRight,
  Filter
} from "lucide-react";

const BuyerTransactions = () => {
  const { user } = useContext(AuthContext);
  const { data: payments, isLoading, error } = useMyPayments();
  const [filter, setFilter] = useState("all");

  const getStatusConfig = (status) => {
    switch (status) {
      case "completed":
        return {
          icon: CheckCircle,
          label: "Completed",
          color: "text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-900/20 dark:border-emerald-900/40",
          iconColor: "text-emerald-500"
        };
      case "failed":
        return {
          icon: XCircle,
          label: "Failed",
          color: "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-900/40",
          iconColor: "text-red-500"
        };
      case "cancelled":
        return {
          icon: Ban,
          label: "Cancelled",
          color: "text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-400 dark:bg-gray-900/20 dark:border-gray-900/40",
          iconColor: "text-gray-500"
        };
      case "pending":
      default:
        return {
          icon: Clock,
          label: "Pending",
          color: "text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-900/20 dark:border-amber-900/40",
          iconColor: "text-amber-500"
        };
    }
  };

  const filteredPayments = payments?.filter((payment) => {
    if (filter === "all") return true;
    return payment.status === filter;
  }) || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-(--color-border) rounded animate-pulse mb-6"></div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-(--color-surface) border border-(--color-border) rounded-xl p-4 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-(--color-border) rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-(--color-border) rounded"></div>
                  <div className="h-3 w-48 bg-(--color-border) rounded"></div>
                </div>
              </div>
              <div className="h-6 w-20 bg-(--color-border) rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/40 rounded-xl p-6 text-center">
        <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-lg font-bold text-red-700 dark:text-red-300">Failed to load transactions</h2>
        <p className="text-red-600 dark:text-red-400 mt-2">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-(--color-text)">
            Transaction <span className="text-(--color-primary)">History</span>
          </h1>
          <p className="mt-1 text-(--color-muted)">
            All your payment transactions
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-(--color-surface) border border-(--color-border) rounded-xl">
          <Receipt className="w-5 h-5 text-(--color-primary)" />
          <span className="font-semibold text-(--color-text)">{payments?.length || 0} transactions</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { value: "all", label: "All" },
          { value: "completed", label: "Completed" },
          { value: "pending", label: "Pending" },
          { value: "failed", label: "Failed" },
          { value: "cancelled", label: "Cancelled" },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              filter === option.value
                ? "bg-(--color-primary) text-white"
                : "bg-(--color-surface) text-(--color-text) border border-(--color-border) hover:border-(--color-primary)"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredPayments.length === 0 ? (
        <div className="bg-(--color-surface) border border-(--color-border) rounded-3xl p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Receipt className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-(--color-text) mb-2">No Transactions Found</h2>
          <p className="text-(--color-muted) max-w-md mx-auto">
            {filter === "all" 
              ? "You haven't made any transactions yet." 
              : `No ${filter} transactions found.`}
          </p>
        </div>
      ) : (
        /* Transactions List */
        <div className="bg-(--color-surface) border border-(--color-border) rounded-2xl overflow-hidden">
          {/* Mobile View */}
          <div className="block lg:hidden divide-y divide-(--color-border)">
            {filteredPayments.map((payment) => {
              const statusConfig = getStatusConfig(payment.status);
              const StatusIcon = statusConfig.icon;
              
              return (
                <div key={payment._id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusConfig.color}`}>
                        <StatusIcon className={`w-5 h-5 ${statusConfig.iconColor}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-(--color-text)">
                          ৳{payment.amount?.toLocaleString()}
                        </p>
                        <p className="text-xs text-(--color-muted)">
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${statusConfig.color}`}>
                      {statusConfig.label}
                    </span>
                  </div>
                  <div className="text-xs text-(--color-muted) font-mono bg-(--color-bg) p-2 rounded truncate">
                    {payment.transactionId}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table View */}
          <table className="hidden lg:table min-w-full">
            <thead>
              <tr className="bg-[color-mix(in_srgb,var(--color-primary)_8%,var(--color-bg))]">
                <th className="py-4 px-6 text-left text-sm font-semibold text-(--color-text)">Transaction ID</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-(--color-text)">Amount</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-(--color-text)">Date & Time</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-(--color-text)">Payment Method</th>
                <th className="py-4 px-6 text-center text-sm font-semibold text-(--color-text)">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--color-border)">
              {filteredPayments.map((payment) => {
                const statusConfig = getStatusConfig(payment.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <tr key={payment._id} className="hover:bg-[color-mix(in_srgb,var(--color-primary)_4%,transparent)] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusConfig.color}`}>
                          <StatusIcon className={`w-5 h-5 ${statusConfig.iconColor}`} />
                        </div>
                        <code className="text-sm font-mono text-(--color-text)">
                          {payment.transactionId?.slice(0, 25)}...
                        </code>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-lg font-bold text-(--color-primary)">
                        ৳{payment.amount?.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-(--color-muted)">
                        <Calendar className="w-4 h-4" />
                        {new Date(payment.createdAt).toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-(--color-text)">
                        <CreditCard className="w-4 h-4 text-(--color-muted)" />
                        {payment.cardType || "SSLCommerz"}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BuyerTransactions;
