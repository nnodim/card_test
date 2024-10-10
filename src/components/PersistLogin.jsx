import useAuthStore from "@/hooks/useAuthStore";
import useRefreshToken from "@/hooks/useRefreshToken";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const isTokenExpired = (expiry) => {
  const expiryDate = new Date(expiry);
  return Date.now() >= expiryDate;
};

const timeUntilTokenExpiry = (expiry) => {
  const expiryDate = new Date(expiry).getTime();
  const now = Date.now();
  return Math.max(expiryDate - now, 0);
};

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { tokens } = useAuthStore();

  useEffect(() => {
    let isMounted = true;
    let refreshTimeout;

    const verifyToken = async () => {
      try {
        if (tokens?.access?.token && isTokenExpired(tokens.access.expires)) {
          await refresh();
        }
      } catch (err) {
        console.error("Token verification failed:", err?.message);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error("Token refresh failed:", err?.message);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    const setupAutoRefresh = () => {
      if (tokens?.access?.expires) {
        const timeUntilExpiry = timeUntilTokenExpiry(tokens.access.expires);
        const refreshBuffer = 60000;

        clearTimeout(refreshTimeout);

        refreshTimeout = setTimeout(async () => {
          console.log("Token is about to expire, refreshing...");
          await refresh();
        }, timeUntilExpiry - refreshBuffer);
      }
    };

    if (tokens?.access?.token) {
      verifyToken();
      setupAutoRefresh();
    } else {
      verifyRefreshToken();
    }

    return () => {
      isMounted = false;
      clearTimeout(refreshTimeout);
    };
  }, [refresh, tokens]);

  // useEffect(() => {
  //   const handleVisibilityChange = async () => {
  //     if (document.visibilityState === "visible") {
  //       if (tokens?.access?.token && isTokenExpired(tokens.access.expires)) {
  //         console.log("Token expired, refreshing...");
  //         try {
  //           await refresh();
  //         } catch (err) {
  //           console.error("Token refresh failed on app return:", err?.message);
  //         }
  //       }
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);

  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, [refresh, tokens]);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="w-16 h-16 animate-spin text-primary" />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};
