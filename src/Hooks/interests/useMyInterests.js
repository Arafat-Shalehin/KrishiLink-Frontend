import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxios";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";

/**
 * Custom hook to fetch interests for the logged-in user using TanStack Query.
 * Provides automatic caching, background refetching, and state management.
 */
export const useMyInterests = () => {
  const instance = useAxiosSecure();
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ["myInterests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await instance.get("/myInterests");
      return res.data.interests || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    onError: (err) => {
      console.error("Error fetching my interests:", err);
    },
  });
};
