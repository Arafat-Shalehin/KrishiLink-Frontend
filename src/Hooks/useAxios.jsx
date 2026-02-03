import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthProvider";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
});

const useAxiosSecure = () => {
  const { user, dltUser } = useContext(AuthContext); // ✅ use dltUser
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        // Don't overwrite Authorization if already set (ex: syncUserToBackend sets it)
        if (user && !config.headers?.Authorization) {
          const token = await user?.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
    );

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const statusCode = error.response?.status;
        if (statusCode === 401) {
          dltUser().then(() => navigate("/auth/login"));
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, dltUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
