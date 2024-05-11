import { create } from "zustand";



export const useAuthStore = create((set) => ({
  accessToken: null,
  setAccessToken: (accessToken) => set({ accessToken:accessToken }),
}));