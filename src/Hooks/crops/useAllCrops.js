// src/Hooks/useAllCrops.js
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxios";

export const useAllCrops = (params) => {
  const instance = useAxiosSecure();

  return useQuery({
    queryKey: ["allCrops", params],
    queryFn: async () => {
      // Build query string from params
      const queryParams = new URLSearchParams();

      if (params.search) queryParams.append("search", params.search);
      if (params.type) queryParams.append("type", params.type);
      if (params.location) queryParams.append("location", params.location);
      if (params.status) queryParams.append("status", params.status);
      if (params.minPrice) queryParams.append("minPrice", params.minPrice);
      if (params.maxPrice) queryParams.append("maxPrice", params.maxPrice);
      if (params.sort) queryParams.append("sort", params.sort);
      if (params.page) queryParams.append("page", params.page);
      if (params.limit) queryParams.append("limit", params.limit);

      const res = await instance.get(`/allCrops?${queryParams.toString()}`);
      return res.data;
    },
    placeholderData: (previousData) => previousData, // Keep previous data while fetching
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Fetch filter options (types, locations) - for dynamic dropdowns
export const useCropFilterOptions = () => {
  const instance = useAxiosSecure();

  return useQuery({
    queryKey: ["cropFilterOptions"],
    queryFn: async () => {
      const res = await instance.get("/allCrops/filter-options");
      return res.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes - these don't change often
  });
};
