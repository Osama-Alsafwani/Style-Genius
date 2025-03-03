import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  token: string | null;
  user: { email: string; id?: string } | null;
  login: (token: string, email: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: (token, email) => set({ token, user: { email } }),
      logout: () => {
        localStorage.removeItem("auth-storage"); // Clear persisted data
        set({ token: null, user: null });
      },
    }),
    { name: "auth-storage" }
  )
);
