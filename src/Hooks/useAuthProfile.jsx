import { useEffect, useState, useCallback } from "react";
import useAxiosSecure from "./useAxios";
import { getMeOrSync } from "../utils/getMeOrSync";

const useAuthProfile = (firebaseUser) => {
  const axiosSecure = useAxiosSecure();

  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(!!firebaseUser);
  const [error, setError] = useState("");

  const fetchMe = useCallback(async () => {
    if (!firebaseUser) {
      setDbUser(null);
      setLoading(false);
      setError("");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const userDoc = await getMeOrSync(axiosSecure, firebaseUser);
      setDbUser(userDoc);
    } catch (err) {
      console.error(err);
      setDbUser(null);

      const status = err?.response?.status;
      if (status === 401) setError("Unauthorized. Please login again.");
      else setError("Failed to load user profile.");
    } finally {
      setLoading(false);
    }
  }, [axiosSecure, firebaseUser]);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return { dbUser, loading, error, refetch: fetchMe };
};

export default useAuthProfile;
