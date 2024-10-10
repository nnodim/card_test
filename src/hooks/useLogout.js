import axios from "@/api/axios";
import useAuthStore from "./useAuthStore";

const useLogout = () => {
  const { clearAuth } = useAuthStore();

  const logout = async () => {
    try {
      await axios.get("/auth/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
    clearAuth();
  };

  return logout;
};

export default useLogout;
