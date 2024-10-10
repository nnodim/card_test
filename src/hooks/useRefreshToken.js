import axios from "@/api/axios";
import useAuthStore from "./useAuthStore";

const useRefreshToken = () => {
  const { setUser, setTokens } = useAuthStore();
  const refresh = async () => {
    const res = await axios.get("/auth/refresh-tokens", {
      withCredentials: true,
    });

    setUser(res.data.user);
    setTokens(res.data.tokens);

    return res.data.tokens.access.token;
  };

  return refresh;
};

export default useRefreshToken;
