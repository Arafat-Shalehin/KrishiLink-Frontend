import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxios";

export const useAdminUserStatusMutation = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/admin/users/${id}/status`, {
        status,
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
      qc.invalidateQueries({ queryKey: ["admin", "overview"] });
    },
  });
};

export const useAdminUserRoleMutation = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosSecure.patch(`/admin/users/${id}/role`, { role });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
      qc.invalidateQueries({ queryKey: ["admin", "overview"] });
      qc.invalidateQueries({ queryKey: ["admin", "farmer-requests"] });
    },
  });
};

export const useAdminApproveRequestMutation = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }) => {
      const res = await axiosSecure.patch(
        `/admin/farmer-requests/${id}/approve`,
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "farmer-requests"] });
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
      qc.invalidateQueries({ queryKey: ["admin", "overview"] });
    },
  });
};

export const useAdminRejectRequestMutation = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }) => {
      const res = await axiosSecure.patch(
        `/admin/farmer-requests/${id}/reject`,
      );
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "farmer-requests"] });
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
      qc.invalidateQueries({ queryKey: ["admin", "overview"] });
    },
  });
};

export const useAdminCropStatusMutation = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/admin/crops/${id}/status`, {
        status,
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "overview"] });
      qc.invalidateQueries({ queryKey: ["admin", "crops"] });
    },
  });
};

export const useAdminDeleteCropMutation = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }) => {
      const res = await axiosSecure.delete(`/admin/crops/${id}`);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "crops"] });
      qc.invalidateQueries({ queryKey: ["admin", "overview"] });
    },
  });
};

export const useAdminResetRequestMutation = () => {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }) => {
      const res = await axiosSecure.patch(`/admin/farmer-requests/${id}/reset`);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "farmer-requests"] });
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
      qc.invalidateQueries({ queryKey: ["admin", "overview"] });
    },
  });
};
