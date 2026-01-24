import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Context/AuthProvider";
import useAuthProfile from "../Hooks/useAuthProfile";
import Loader from "../Components/Loader";

const RoleRoute = ({ allowed = [], children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const { dbUser, loading: profileLoading } = useAuthProfile(user);

  if (loading || profileLoading) return <Loader />;

  if (!user) return <Navigate to="/auth/login" state={location.pathname} replace />;

  if (!dbUser?.role) return <Navigate to="/auth/login" replace />;

  if (!allowed.includes(dbUser?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleRoute;