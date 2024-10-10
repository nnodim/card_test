import { useNavigate, useLocation } from "react-router-dom";
import { useCallback } from "react";

const useOverviewNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleOverviewClick = useCallback(() => {
    if (location.pathname === "/") {
      // If we're already on the home page, scroll to the top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // If we're on another page, navigate to the home page
      navigate("/");
    }
  }, [navigate, location.pathname]);

  return handleOverviewClick;
};

export default useOverviewNavigation;
