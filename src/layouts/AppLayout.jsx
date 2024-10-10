import { initGA, logPageView } from "@/lib/analytics";
import { generateRandomToken } from "@/lib/utils";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

export const AppLayout = () => {
  const location = useLocation();
  useEffect(() => {
    const existingToken = localStorage.getItem("userToken");

    if (!existingToken) {
      const newToken = generateRandomToken();
      localStorage.setItem("userToken", newToken);
    }

    if (import.meta.env.VITE_MODE === "production") {
      initGA();
    }
  }, []);

  useEffect(() => {
    logPageView();
  }, [location.pathname]);

  return <Outlet />;
};
