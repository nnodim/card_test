import useAuthStore from "@/hooks/useAuthStore";
import { LOGIN, NOT_FOUND } from "@/lib/routes";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export const RequireAuth = ({ allowedRoles }) => {
  const { user } = useAuthStore();
  const location = useLocation();
  const loggedIn = user ? true : false;

  if (!loggedIn) {
    return <Navigate to={LOGIN} state={{ from: location }} replace />;
  }

  if (!user?.role) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={NOT_FOUND} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

RequireAuth.propTypes = {
  allowedRoles: PropTypes.array,
};
