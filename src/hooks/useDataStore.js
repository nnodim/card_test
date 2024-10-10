import { create } from "zustand";

export const useDataStore = create((set) => ({
    info: {},
    activeTab: "1",
    purchaseId: "",
    isStep1Completed: false,
    setActiveTab: (data) => set((state) => ({ ...state, activeTab: data })),
    setInfo: (data) => set((state) => ({ ...state, info: data })),
    setIsStep1Completed: (data) => set((state) => ({ ...state, isStep1Completed: data })),
    setPurchaseId: (data) => set((state) => ({ ...state, purchaseId: data })),
}))