import { useEffect } from "react";
import useAuthStore from "./useAuthStore";
import useRefreshToken from "./useRefreshToken";
import { axiosPrivate } from "@/api/axios";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { tokens } = useAuthStore();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers[
            "Authorization"
          ] = `Bearer ${tokens?.access?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newTokens = await refresh();
          prevRequest.headers[
            "Authorization"
          ] = `Bearer ${newTokens?.tokens?.access?.token}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [tokens, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
