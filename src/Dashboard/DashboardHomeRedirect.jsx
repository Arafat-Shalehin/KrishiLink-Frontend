import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthProvider";
import useAuthProfile from "../Hooks/useAuthProfile";
import Loader from "../Components/Loader";

const DashboardHomeRedirect = () => {
  const { user, loading } = useContext(AuthContext);
  const { dbUser, loading: profileLoading } = useAuthProfile(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading || profileLoading) return;
    if (!user) return navigate("/auth/login");

    const role = dbUser?.role;
    if (role === "farmer") navigate("/dashboard/farmer", { replace: true });
    else if (role === "buyer") navigate("/dashboard/buyer", { replace: true });
    else navigate("/dashboard/profile", { replace: true });
  }, [loading, profileLoading, user, dbUser, navigate]);

  return <Loader />;
};

export default DashboardHomeRedirect;
