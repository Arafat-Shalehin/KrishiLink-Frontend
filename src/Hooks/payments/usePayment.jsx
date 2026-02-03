import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../useAxios";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";

/**
 * Hook for payment-related API calls
 */
export const usePayment = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  /**
   * Initiate a payment for an accepted interest
   * Returns a URL to redirect user to SSLCommerz payment page
   */
  const initiatePaymentMutation = useMutation({
    mutationFn: async (paymentData) => {
      const response = await axiosSecure.post("/payment/init", paymentData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate interests cache after payment initiation
      queryClient.invalidateQueries(["myInterests"]);
    },
  });

  /**
   * Initiate payment and redirect to payment gateway
   */
  const initiatePayment = async (paymentData) => {
    const result = await initiatePaymentMutation.mutateAsync(paymentData);
    
    if (result.success && result.paymentUrl) {
      // Redirect to SSLCommerz payment page
      window.location.href = result.paymentUrl;
    }
    
    return result;
  };

  return {
    initiatePayment,
    isLoading: initiatePaymentMutation.isPending,
    error: initiatePaymentMutation.error,
  };
};



/**
 * Hook to fetch user's payment history
 */
export const useMyPayments = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ["myPayments", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get("/payment/my-payments");
      return response.data.payments || [];
    },
    enabled: !!user?.email,
  });
};

/**
 * Hook to fetch a specific payment by transaction ID
 */
export const usePaymentDetails = (transactionId) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["payment", transactionId],
    queryFn: async () => {
      const response = await axiosSecure.get(`/payment/${transactionId}`);
      return response.data.payment;
    },
    enabled: !!transactionId,
  });
};

export default usePayment;
