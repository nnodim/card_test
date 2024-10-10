import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  tokens: null,
  setUser: (user) => set({ user }),
  setTokens: (tokens) => set({ tokens }),
  clearAuth: () => set({ user: null, tokens: null }),
}));

export default useAuthStore;
